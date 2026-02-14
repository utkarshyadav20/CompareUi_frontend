import { Step } from '../components/automation/StepRow';

interface PageFlow {
    name: string;
    steps: Step[];
}

export const generateJavaCode = (page: PageFlow): string => {
    const methodName = page.name.replace(/\s+/g, '') || 'fullAppFlow';

    let code = `    public static String ${methodName}() throws Exception {\n\n`;
    code += `        AppLauncher.launchApp();\n`;
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
                    const val = step.value;

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

    code += `\n        AppLauncher.closeApp();\n`;
    code += `        DriverManager.quitDriver();\n`;
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
