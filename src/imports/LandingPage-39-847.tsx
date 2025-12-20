import svgPaths from "./svg-lnmdcoqit8";
import clsx from "clsx";
import imgFrame21 from "figma:asset/4162ceeb80530f8f205313a378469f2d23a67359.png";
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[5px] relative w-full">{children}</div>
      </div>
    </div>
  );
}
type Text1Props = {
  text: string;
};

function Text1({ text }: Text1Props) {
  return (
    <Wrapper>
      <p className="basis-0 font-['DM_Sans:Regular',sans-serif] font-normal grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[12px] text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        {text}
      </p>
    </Wrapper>
  );
}
type Helper1Props = {
  text: string;
  text1: string;
};

function Helper1({ text, text1 }: Helper1Props) {
  return (
    <div className="content-stretch flex gap-[9px] items-start justify-center leading-[normal] not-italic relative shrink-0 text-center text-nowrap text-white">
      <p className="font-['Font_Awesome_6_Pro:Solid',sans-serif] relative shrink-0 text-[20px]">{text}</p>
      <p className="font-['DM_Mono:Regular',sans-serif] relative shrink-0 text-[14px]">{text1}</p>
    </div>
  );
}

function Frame2087330110Helper() {
  return (
    <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 145 1">
            <line id="Line 340" stroke="var(--stroke-0, white)" strokeDasharray="6 6" strokeOpacity="0.2" style={{ stroke: "white", strokeOpacity: "0.2" }} x2="144.5" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
type HelperProps = {
  text: string;
  text1: string;
};

function Helper({ text, text1 }: HelperProps) {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center p-[10px] relative rounded-[4px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[rgba(107,223,149,0.3)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Mono:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#6bdf95] text-[14px] text-nowrap">{text}</p>
      <p className="font-['Font_Awesome_6_Pro:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#6bdf95] text-[14px] text-nowrap">{text1}</p>
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("content-stretch flex items-center px-[20px] relative", additionalClassNames)}>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.5)] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        {text}
      </p>
    </div>
  );
}

function AndroidSvgrepoCom() {
  return (
    <div className="relative shrink-0 size-[37px]" data-name="android_svgrepo.com">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37 37">
        <g id="android_svgrepo.com">
          <rect fill="var(--fill-0, #2EFF2E)" fillOpacity="0.4" height="37" rx="8" style={{ fill: "color(display-p3 0.1798 1.0000 0.1798)", fillOpacity: "0.4" }} width="37" />
          <path d={svgPaths.p824ec00} fill="var(--fill-0, white)" id="Vector" style={{ fill: "white", fillOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[normal] relative shrink-0 text-nowrap">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold relative shrink-0 text-[16px] text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        Gray Media _ KTWX
      </p>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Android TV Physical Device
      </p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <AndroidSvgrepoCom />
      <Frame13 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="aspect-[112.686/47] content-stretch flex gap-[20px] h-full items-center relative shrink-0">
      <p className="font-['Font_Awesome_6_Pro:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[22.124px] text-[rgba(255,255,255,0.5)] text-nowrap">chevron-left</p>
      <Frame14 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] relative rounded-[100px] shrink-0 w-[46px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[20px] py-[14px] relative rounded-[inherit] w-full">
        <p className="font-['Font_Awesome_6_Pro:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-nowrap text-white">bell</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[100px]" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold items-end leading-[normal] relative shrink-0 text-nowrap">
      <p className="relative shrink-0 text-[16px] text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        Abhijeet Punia
      </p>
      <p className="relative shrink-0 text-[10px] text-[rgba(255,255,255,0.5)]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Qucikplay
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative rounded-[100px] shrink-0 size-[47px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[100px]">
        <div className="absolute bg-[#ffcc8a] inset-0 rounded-[100px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[100px] size-full" src={imgFrame21} />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[7px] items-center relative shrink-0">
      <Frame2 />
      <Frame />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[18px] items-center justify-end relative shrink-0">
      <Frame6 />
      <Frame4 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] py-[16px] relative w-full">
          <div className="flex flex-row items-center self-stretch">
            <Frame3 />
          </div>
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-solid border-white inset-0 pointer-events-none" />
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        Testing Panel
      </p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.7px] border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[32px] py-0 relative w-full">
          <Frame8 />
          <Text text="Activity" additionalClassNames="justify-center py-[10px] shrink-0" />
          <Text text="Result" additionalClassNames="justify-center py-[10px] shrink-0" />
          <Text text="DB connection" additionalClassNames="justify-center py-[10px] shrink-0" />
          <Text text="Integration" additionalClassNames="justify-center py-[10px] shrink-0" />
          <Text text="Support" additionalClassNames="justify-center py-[10px] shrink-0" />
          <Text text="Settings" additionalClassNames="justify-center py-[10px] shrink-0" />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame7 />
      <Frame10 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        Method :
      </p>
      <Helper text="Pixelmatch" text1="Chevron-down" />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        Threshold :
      </p>
      <Helper text="3x" text1="Chevron-down" />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        Build :
      </p>
      <Helper text="v1.0.234.1" text1="Chevron-down" />
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center overflow-clip px-[16px] py-[11.798px] relative rounded-[7.26px] shrink-0">
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#0e0e0e] text-[14px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Start Comparing UI
      </p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <Frame26 />
      <Frame27 />
      <Frame29 />
      <Frame11 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex h-[41px] items-center justify-end relative shrink-0 w-full">
      <Frame37 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[32px] py-[11px] relative w-full">
          <Frame28 />
        </div>
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <div className="aspect-[12/12] content-stretch flex flex-col h-full items-center justify-center relative rounded-[3px] shrink-0">
      <p className="font-['Font_Awesome_6_Pro:Light',sans-serif] leading-[5px] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.6)] text-nowrap tracking-[-1.12px]">ROTATE</p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="aspect-[12/12] content-stretch flex flex-col h-full items-center justify-center relative rounded-[3px] shrink-0">
      <p className="font-['Font_Awesome_6_Pro:Light',sans-serif] leading-[5px] not-italic relative shrink-0 text-[16px] text-[rgba(255,0,0,0.5)] text-nowrap tracking-[-1.12px]">TRASH-XMARK</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex h-full items-center relative shrink-0">
      <Frame34 />
      <Frame35 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[20px] text-nowrap text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        Baselining Images
      </p>
      <div className="flex flex-row items-center self-stretch">
        <Frame36 />
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[9px] items-center leading-[normal] not-italic relative shrink-0 text-center text-white w-full">
      <p className="font-['Font_Awesome_6_Pro:Solid',sans-serif] relative shrink-0 text-[20px] text-nowrap">link</p>
      <p className="font-['DM_Mono:Regular',sans-serif] min-w-full relative shrink-0 text-[14px] w-[min-content]">Enter Figma screen url</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0.05)] grow min-h-px min-w-px relative rounded-[8px] shrink-0">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <Text text="Enter Figma screen url" additionalClassNames="py-[14px] w-full" />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center overflow-clip px-[16px] py-[13px] relative rounded-[8px] self-stretch shrink-0">
      <p className="font-['Font_Awesome_6_Pro:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0e0e0e] text-[18px] text-nowrap">arrow-right</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[5px] items-start relative shrink-0 w-full">
      <Frame1 />
      <Frame12 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-center justify-center px-[10px] py-[20px] relative w-full">
          <Frame19 />
          <Frame21 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex gap-[19px] items-center overflow-clip px-0 py-[5px] relative shrink-0 w-full">
      <Frame2087330110Helper />
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">OR</p>
      <Frame2087330110Helper />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 w-full">
      <Helper1 text="File-upload" text1="Upload CSV" />
      <Helper1 text="image" text1="Upload IMAGE" />
    </div>
  );
}

function Frame18() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] h-[172px] relative rounded-[10px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[10px] relative size-full">
          <Frame24 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(255,255,255,0.2)] border-dashed inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-full">
      <Frame20 />
      <Frame32 />
      <Frame18 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] h-full relative shrink-0 w-[384px]">
      <div className="content-stretch flex flex-col gap-[20px] items-center overflow-clip p-[20px] relative rounded-[inherit] size-full">
        <Frame31 />
        <Frame33 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-[rgba(255,255,255,0.5)] text-center w-full">
        Waiting for image to receive
        <br aria-hidden="true" />
        from Android build
      </p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[11px] items-center leading-[normal] relative shrink-0 text-[18px] text-white">
      <p className="font-['Font_Awesome_6_Pro:Light',sans-serif] not-italic relative shrink-0 w-[18px]">folder</p>
      <p className="[text-underline-position:from-font] decoration-solid font-['DM_Sans:Regular',sans-serif] font-normal relative shrink-0 text-center text-nowrap underline" style={{ fontVariationSettings: "'opsz' 14" }}>
        Browse Folder
      </p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col gap-[37px] items-center relative shrink-0 w-full">
      <Frame17 />
      <Frame25 />
    </div>
  );
}

function Frame39() {
  return (
    <Wrapper additionalClassNames="bg-[rgba(255,255,255,0.05)] rounded-[4px]">
      <p className="basis-0 font-['DM_Sans:Bold',sans-serif] font-bold grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#6bdf95] text-[12px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        V1.0.234.1
      </p>
    </Wrapper>
  );
}

function Frame38() {
  return (
    <div className="absolute bg-[#303030] content-stretch flex flex-col items-start left-[640.94px] overflow-clip p-[5px] rounded-[4px] top-[-10px] w-[128px]">
      <Text1 text="V1.0.235.1" />
      <Frame39 />
      <Text1 text="V1.0.233.1" />
      <Text1 text="V1.0.232.1" />
    </div>
  );
}

function Frame30() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0.1)] grow h-full min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[237px] items-start p-[20px] relative size-full">
          <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[20px] text-nowrap text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
            Actual Build images
          </p>
          <Frame22 />
          <Frame38 />
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="h-[786px] relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[25px] pt-0 px-[32px] relative size-full">
          <Frame16 />
          <Frame30 />
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-black content-stretch flex flex-col gap-[2px] items-start relative size-full" data-name="Landing page">
      <Frame9 />
      <Frame23 />
      <Frame15 />
    </div>
  );
}