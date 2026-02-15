import { Step } from '../components/automation/StepRow';

interface PageFlow {
    name: string;
    steps: Step[];
}

export const generateJavaCode = (page: PageFlow): string => {
    const methodName = page.name.replace(/\s+/g, '') || 'fullAppFlow';

    let code = `    public static String ${methodName}() throws Exception {\n\n`;
    code += `        AndroidDriver driver = DriverManager.getDriver();\n`;
    code += `        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));\n\n`;

    page.steps.forEach((step) => {
        switch (step.type) {
            case 'Wait':
                // Time-based waits
                if (step.action === 'ms' || step.action === 'sec') {
                    const unit = step.action === 'ms' ? '' : ' * 1000';
                    code += `        Thread.sleep(${step.value}${unit});\n`;
                } else {
                    // Condition-based waits
                    let waitSelector = '';
                    const locatorType = step.locatorType;
                    // Replace double quotes with single quotes inside the value
                    const val = (step.value || '').replace(/"/g, "'");

                    if (locatorType === 'UI Automator') {
                        // User inputs the full matcher in the text area
                        waitSelector = `AppiumBy.androidUIAutomator("${val}")`;

                    } else if (locatorType === 'XPath') {
                        waitSelector = `By.xpath("${val}")`;
                    } else {
                        // Default fallback if locatorType is missing but action implies condition
                        // Assuming ID
                        waitSelector = `AppiumBy.id("${val}")`;
                    }

                    // Generate wait condition
                    switch (step.action) {
                        case 'visibilityOfElementLocated':
                            code += `        wait.until(ExpectedConditions.visibilityOfElementLocated(${waitSelector}));\n`;
                            break;
                        case 'elementToBeClickable':
                            code += `        wait.until(ExpectedConditions.elementToBeClickable(${waitSelector}));\n`;
                            break;
                        case 'presenceOfElementLocated':
                            code += `        wait.until(ExpectedConditions.presenceOfElementLocated(${waitSelector}));\n`;
                            break;
                        case 'invisibilityOfElementLocated':
                            code += `        wait.until(ExpectedConditions.invisibilityOfElementLocated(${waitSelector}));\n`;
                            break;
                    }
                }
                break;

            case 'Capture':
                code += `        take(driver, "${step.value}");\n`;
                break;

            case 'Step':
                const times = step.value || '1';
                // Map DPAD actions to AndroidKey
                const key = step.action.replace('DPAD_', 'DPAD_'); // Direct mapping usually works for DPAD keys
                code += `        press(driver, AndroidKey.${step.action}, ${times});\n`;
                break;
        }
    });

    code += `        return "${page.name.replace(/\s+/g, '')}.png";\n`;
    code += `    }`;

    return code;
};

export const generateFullFile = (pages: PageFlow[]): string => {
    const className = "GrayTVAutomation";
    let content = `package com.framework.flows;

import com.framework.channel.Channel;
import com.framework.core.AppLauncher;
import com.framework.core.DriverManager;
import com.framework.locators.AndroidTVLocators;
import com.framework.utils.ScreenshotUtil;

import io.appium.java_client.AppiumBy;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.nativekey.AndroidKey;
import io.appium.java_client.android.nativekey.KeyEvent;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

import java.io.File;
import java.time.Duration;

public class ${className} {

    // ---------- COMMON HELPERS ----------
    private static final Channel channel = Channel.KWTX;
    
    private static void press(AndroidDriver driver, AndroidKey key, int times) {
        for (int i = 0; i < times; i++) {
            driver.pressKey(new KeyEvent(key));
        }
    }

    private static String take(AndroidDriver driver, String name) throws Exception {
        String folder = System.getProperty("user.dir") + File.separator + "screenshots" + File.separator;
        new File(folder).mkdirs();
        String path = folder + name + ".png";
        ScreenshotUtil.takeScreenshot(driver, path);
        return path;
    }

`;

    pages.forEach(p => {
        content += `${generateJavaCode(p)}\n\n`;
    });

    content += `}`;
    return content;
};

export const generateRunnerFile = (pages: PageFlow[]): string => {
    let content = `package Runner;

import com.framework.core.Appinstaller;
import com.framework.core.AppiumServerManager;
import com.framework.core.DriverManager;
import com.framework.config.ConfigLoader;
import com.framework.flows.GrayTVAutomation;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class AndroidTVOnlyRunner {

    public static WebDriver driver;
    public static WebDriverWait wait;

    @BeforeClass
    @Parameters({"kwtxApkPath", "kwtxPackage"})
    public void setup(@org.testng.annotations.Optional("") String apkPath, 
                      @org.testng.annotations.Optional("com.quickplay.app.graymedia.kwtx") String packageName) throws Exception {

        String udid = DriverManager.getUdid();
        AppiumServerManager.startServer();

        // Ensure ADB connection is established (Crucial for Docker)
        if (udid != null && !udid.isEmpty() && udid.contains(":")) {
             Appinstaller.connect(udid);
        }
        
        Appinstaller.verifyConnection();

        if (apkPath == null || apkPath.isEmpty() || apkPath.equals("null")) {
            apkPath = ConfigLoader.get("APK_PATH");
        }
        
        System.out.println("Using Package: " + packageName);
        Appinstaller.forceStop(udid, packageName);
        
        if (apkPath != null && !apkPath.isEmpty() && !apkPath.equals("null")) {
             System.out.println("Installing APK from: " + apkPath);
             Appinstaller.install(udid, apkPath);
        } else {
             System.out.println("No APK path provided. Skipping installation.");
        }
        
        AppLauncher.launchApp();
    }

    @AfterClass
    @Parameters({"kwtxApkPath", "kwtxPackage"})
    public void teardown(@org.testng.annotations.Optional("") String apkPath, 
                         @org.testng.annotations.Optional("com.quickplay.app.graymedia.kwtx") String packageName) throws Exception {
        String udid = DriverManager.getUdid();
        AppLauncher.closeApp();
        DriverManager.quitDriver();
        AppiumServerManager.stopServer();
        System.out.println("Cleanup completed");
    }

`;

    pages.forEach((p, index) => {
        const methodName = p.name.replace(/\s+/g, '');
        content += `    @Test(priority = ${index})
    public void capture${methodName}() throws Exception {
        GrayTVAutomation.${methodName}();
    }\n\n`;
    });

    content += `}`;
    return content;
};

export const generateCompareAppFile = (pages: PageFlow[]): string => {
    let content = `package Runner;

import com.framework.core.Appinstaller;
import com.framework.core.AppiumServerManager;
import com.framework.core.DriverManager;
import com.framework.flows.GrayTVAutomation;
import com.framework.utils.ChromePopupHandler;
import com.framework.utils.FileUploader;
import com.framework.utils.ScreenshotCleanupUtil;
import com.framework.utils.CSVUploader;

import io.github.bonigarcia.wdm.WebDriverManager;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import org.testng.annotations.*;

import java.time.Duration;

public class CompareApp {

    public static WebDriver driver;
    public static WebDriverWait wait;

    private static final String SCREENSHOT_FOLDER = "C:\\\\GrayTV\\\\screenshots";

    @BeforeClass
    @Parameters({"kwtxApkPath", "kwtxPackage"})
    public void setup(@org.testng.annotations.Optional("") String apkPath, 
                      @org.testng.annotations.Optional("com.quickplay.app.graymedia.kwtx") String packageName) throws Exception {

        String udid = DriverManager.getUdid();
        AppiumServerManager.startServer();

        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));

        driver.get("https://compare.abhijeetpunia.com/");
        System.out.println("Website launched successfully");

        if (apkPath == null || apkPath.isEmpty() || apkPath.equals("null")) {
             apkPath = "/Users/utkarsh2002/Desktop/internshala/automation pixby/AndroidTvGray-FigmaCompare/kwtx-graymedia-prod-release_v1.17.apk";
        }

        System.out.println("Using Package: " + packageName);
        Appinstaller.forceStop(udid, packageName);
        
        if (apkPath != null && !apkPath.isEmpty() && !apkPath.equals("null")) {
             System.out.println("Installing APK from: " + apkPath);
             Appinstaller.install(udid, apkPath);
        } else {
             System.out.println("No APK path provided. Skipping installation.");
        }
        
        AppLauncher.launchApp();
    }

`;

    // Generate test methods for each page
    pages.forEach((p, index) => {
        const methodName = p.name.replace(/\s+/g, '');
        content += `    @Test(priority = ${index})
    public void capture${methodName}() throws Exception {
        GrayTVAutomation.${methodName}();
    }\n\n`;
    });

    // Calculate priority for the subsequent steps
    const nextPriority = pages.length;

    content += `    @Test(priority = ${nextPriority})
    public void launchWebPortal() throws Exception {
        if (driver == null) {
            WebDriverManager.chromedriver().setup();
            driver = new ChromeDriver();
            driver.manage().window().maximize();
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
            wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        }

        driver.get("https://compare.abhijeetpunia.com/");
        System.out.println("Website launched successfully");
    }

    @Test(priority = ${nextPriority + 1})
    public void uploadScreenshotsAndCSV() throws Exception {

        System.out.println("⬆ Uploading screenshots + CSV");

        driver.navigate().refresh();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//div[contains(@class,'cursor-pointer')]")));

        FileUploader.uploadFromFolder(driver, wait, SCREENSHOT_FOLDER);
        ChromePopupHandler.handleChromeUploadPopup(driver);

        String csvPath = new java.io.File(
                CompareApp.class
                        .getClassLoader()
                        .getResource("figma_mapping.csv")
                        .toURI()
        ).getAbsolutePath();

        System.out.println("Resolved CSV Path = " + csvPath);

        CSVUploader.uploadCSV(driver, wait, csvPath);
        Thread.sleep(30000);
        ChromePopupHandler.handleChromeUploadPopup(driver);

        ScreenshotCleanupUtil.deleteAllScreenshots(SCREENSHOT_FOLDER);

        WebElement CompareBtn = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[@class='bg-black dark:bg-white text-white dark:text-black px-[16px] py-[11.798px] rounded-[7.26px] flex items-center gap-[9.075px] text-[14px] font-semibold hover:bg-black/90 dark:hover:bg-white/90 transition-colors ']")));
        CompareBtn.click();

        System.out.println(" Upload completed successfully");
    }

    @AfterClass
    @Parameters({"kwtxApkPath", "kwtxPackage"})
    public void teardown(@org.testng.annotations.Optional("") String apkPath, 
                         @org.testng.annotations.Optional("com.quickplay.app.graymedia.kwtx") String packageName) throws Exception {
        String udid = DriverManager.getUdid();
        AppLauncher.closeApp();
        DriverManager.quitDriver();
        AppiumServerManager.stopServer();
        // Appinstaller.uninstall(udid, packageName);
        System.out.println("Cleanup completed");
    }
}`;

    return content;
};
