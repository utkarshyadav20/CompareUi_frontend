import svgPaths from "./svg-buhn5qybmz";
import clsx from "clsx";
import imgFrame21 from "figma:asset/4162ceeb80530f8f205313a378469f2d23a67359.png";

function Wrapper3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">{children}</div>
    </div>
  );
}
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">{children}</div>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper2>
      <div className="content-stretch flex items-center px-[11px] py-[2px] relative w-full">{children}</div>
    </Wrapper2>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("basis-0 bg-[#1d1d1d] grow min-h-px min-w-[190px] relative rounded-[8px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[22px] items-start min-w-[inherit] px-[12px] py-[19px] relative w-full">{children}</div>
      </div>
    </div>
  );
}
type TextText2Props = {
  text: string;
};

function TextText2({ text }: TextText2Props) {
  return (
    <Wrapper3>
      <p className="font-['Consolas:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#808080] text-[16px] text-nowrap">{text}</p>
    </Wrapper3>
  );
}
type TextText1Props = {
  text: string;
};

function TextText1({ text }: TextText1Props) {
  return (
    <Wrapper3>
      <p className="font-['Consolas:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-[red] text-nowrap">{text}</p>
    </Wrapper3>
  );
}
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <div className="content-stretch flex gap-[20px] items-center px-[10px] py-0 relative shrink-0 w-[125px]">
      <Text14 text="eye" additionalClassNames="h-[30px]" />
      <Text14 text="Download" additionalClassNames="flex-col rounded-[6px] size-[30px]" />
    </div>
  );
}
type Text14Props = {
  text: string;
  additionalClassNames?: string;
};

function Text14({ text, additionalClassNames = "" }: Text14Props) {
  return (
    <div className={clsx("content-stretch flex items-center justify-center relative shrink-0", additionalClassNames)}>
      <p className="font-['Font_Awesome_6_Pro:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.5)] text-nowrap">{text}</p>
    </div>
  );
}
type Text13Props = {
  text: string;
};

function Text13({ text }: Text13Props) {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[137px]">
      <p className="font-['DM_Mono:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.5)] text-nowrap">{text}</p>
    </div>
  );
}
type TextTextProps = {
  text: string;
};

function TextText({ text }: TextTextProps) {
  return (
    <Wrapper3>
      <p className="font-['Consolas:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#05df72] text-[16px] text-nowrap">{text}</p>
    </Wrapper3>
  );
}
type Text12Props = {
  text: string;
  additionalClassNames?: string;
};

function Text12({ text, additionalClassNames = "" }: Text12Props) {
  return (
    <div className={clsx("content-stretch flex items-center p-[10px] relative shrink-0", additionalClassNames)}>
      <p className="basis-0 font-['DM_Mono:Medium',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.5)]">{text}</p>
    </div>
  );
}
type Text11Props = {
  text: string;
};

function Text11({ text }: Text11Props) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[10px] relative w-full">
          <p className="basis-0 font-['DM_Sans:SemiBold',sans-serif] font-semibold grow leading-[24px] min-h-px min-w-px relative shrink-0 text-[16px] text-[rgba(255,255,255,0.5)]" style={{ fontVariationSettings: "'opsz' 14" }}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
type Text10Props = {
  text: string;
};

function Text10({ text }: Text10Props) {
  return (
    <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0 w-[65px]">
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.5)] text-nowrap">{text}</p>
    </div>
  );
}
type Text9Props = {
  text: string;
  additionalClassNames?: string;
};

function Text9({ text, additionalClassNames = "" }: Text9Props) {
  return (
    <div className={clsx("content-stretch flex items-center p-[10px] relative", additionalClassNames)}>
      <p className="basis-0 font-['DM_Sans:SemiBold',sans-serif] font-semibold grow leading-[24px] min-h-px min-w-px relative shrink-0 text-[18px] text-[rgba(255,255,255,0.7)]" style={{ fontVariationSettings: "'opsz' 14" }}>
        {text}
      </p>
    </div>
  );
}
type Text8Props = {
  text: string;
  additionalClassNames?: string;
};

function Text8({ text, additionalClassNames = "" }: Text8Props) {
  return (
    <div className={clsx("content-stretch flex items-center p-[10px] relative shrink-0", additionalClassNames)}>
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[18px] text-[rgba(255,255,255,0.7)] text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        {text}
      </p>
    </div>
  );
}
type Text7Props = {
  text: string;
};

function Text7({ text }: Text7Props) {
  return (
    <Wrapper additionalClassNames="opacity-20">
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[18px] text-white w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        {text}
      </p>
      <Text6 text="145" />
    </Wrapper>
  );
}
type Text6Props = {
  text: string;
};

function Text6({ text }: Text6Props) {
  return (
    <div className="content-stretch flex gap-[3px] items-end relative shrink-0 w-full">
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[24px] text-nowrap text-white">{text}</p>
      <Text4 text="93.4%" />
    </div>
  );
}
type Text5Props = {
  text: string;
};

function Text5({ text }: Text5Props) {
  return (
    <div className="h-[11.215px] relative shrink-0 w-[10px]">
      <p className="absolute font-['Font_Awesome_6_Pro:Solid',sans-serif] leading-[normal] left-[5px] not-italic text-[#ff383c] text-[10px] text-center text-nowrap top-0 translate-x-[-50%]">{text}</p>
    </div>
  );
}
type Text4Props = {
  text: string;
};

function Text4({ text }: Text4Props) {
  return (
    <div className="content-stretch flex gap-[2px] h-[12px] items-center relative shrink-0">
      <Text3 text="circle-up" />
      <p className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-[17.037px] relative shrink-0 text-[#34c759] text-[12px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
    </div>
  );
}
type Text3Props = {
  text: string;
};

function Text3({ text }: Text3Props) {
  return (
    <div className="h-[11.215px] relative shrink-0 w-[10px]">
      <p className="absolute font-['Font_Awesome_6_Pro:Solid',sans-serif] leading-[normal] left-[5px] not-italic text-[#34c759] text-[10px] text-center text-nowrap top-0 translate-x-[-50%]">{text}</p>
    </div>
  );
}
type Text2Props = {
  text: string;
  additionalClassNames?: string;
};

function Text2({ text, additionalClassNames = "" }: Text2Props) {
  return (
    <div className={clsx("content-stretch flex flex-col items-center justify-center p-[8.28px] relative rounded-[3.312px] shrink-0", additionalClassNames)}>
      <p className="font-['Font_Awesome_6_Pro:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14.903px] text-[rgba(255,255,255,0.5)] w-full">{text}</p>
    </div>
  );
}
type Text1Props = {
  text: string;
};

function Text1({ text }: Text1Props) {
  return (
    <div className="content-stretch flex items-center justify-center px-[20px] py-[10px] relative shrink-0">
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

function Frame12() {
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

function Frame13() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <AndroidSvgrepoCom />
      <Frame12 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="aspect-[112.686/47] content-stretch flex gap-[20px] h-full items-center relative shrink-0">
      <p className="font-['Font_Awesome_6_Pro:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[22.124px] text-[rgba(255,255,255,0.5)] text-nowrap">chevron-left</p>
      <Frame13 />
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
        Result
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
          <Text1 text="Testing Panel" />
          <Text1 text="Activity" />
          <Frame8 />
          <Text1 text="DB connection" />
          <Text1 text="Integration" />
          <Text1 text="Support" />
          <Text1 text="Settings" />
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

function Frame1() {
  return (
    <div className="h-full relative rounded-[6px] shrink-0 w-[381px]">
      <div className="content-stretch flex gap-[10px] items-center leading-[normal] overflow-clip px-[20px] py-[14px] relative rounded-[inherit] size-full text-[rgba(255,255,255,0.5)] text-nowrap">
        <p className="font-['Font_Awesome_6_Pro:Regular',sans-serif] not-italic relative shrink-0 text-[18px]">search</p>
        <p className="font-['DM_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[16px]" style={{ fontVariationSettings: "'opsz' 14" }}>
          Search for result
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-[41px] relative rounded-[6px] shrink-0 w-[72.818px]">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[4.554px] relative rounded-[inherit] size-full">
        <Text2 text="grid-2" />
        <Text2 text="list" additionalClassNames="bg-[rgba(255,255,255,0.1)]" />
      </div>
      <div aria-hidden="true" className="absolute border-[0.828px] border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex h-full items-center relative shrink-0">
      <Frame11 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[10px] h-full items-center justify-center p-[10px] relative rounded-[4px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[rgba(107,223,149,0.3)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['DM_Mono:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#6bdf95] text-[14px] text-nowrap">Build v12.224</p>
      <p className="font-['Font_Awesome_6_Pro:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#6bdf95] text-[14px] text-nowrap">Chevron-down</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex h-full items-center relative rounded-[6px] shrink-0">
      <Frame17 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-white content-stretch flex gap-[9.075px] items-center justify-center leading-[normal] overflow-clip px-[16px] py-[11.798px] relative rounded-[6px] shrink-0 text-[#0e0e0e] text-[14px] text-nowrap">
      <p className="font-['Font_Awesome_6_Pro:Solid',sans-serif] not-italic relative shrink-0">file-check</p>
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold relative shrink-0" style={{ fontVariationSettings: "'opsz' 14" }}>
        Download Full Report
      </p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <Frame21 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Frame18 />
      </div>
      <Frame19 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex h-[41px] items-center justify-between relative shrink-0 w-full">
      <Frame1 />
      <Frame22 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[32px] py-[11px] relative w-full">
          <Frame20 />
        </div>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex items-end relative shrink-0 w-full">
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[24px] text-nowrap text-white">145</p>
    </div>
  );
}

function Frame25() {
  return (
    <Wrapper>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[18px] text-white w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Total Test
      </p>
      <Frame24 />
    </Wrapper>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex gap-[3px] items-end relative shrink-0 w-full">
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[24px] text-nowrap text-white">120</p>
      <Text4 text="50.4%" />
    </div>
  );
}

function Frame26() {
  return (
    <Wrapper>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[18px] text-white w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Test Passed
      </p>
      <Frame29 />
    </Wrapper>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[2px] h-[12px] items-center relative shrink-0">
      <Text5 text="circle-down" />
      <p className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-[17.037px] relative shrink-0 text-[#ff383c] text-[12px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        93.4%
      </p>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex gap-[3px] items-end relative shrink-0 w-full">
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[24px] text-nowrap text-white">17</p>
      <Frame14 />
    </div>
  );
}

function Frame27() {
  return (
    <Wrapper>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[18px] text-white w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Test Failed
      </p>
      <Frame55 />
    </Wrapper>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[2px] h-[12px] items-center relative shrink-0">
      <Text5 text="warning" />
      <p className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-[17.037px] relative shrink-0 text-[#ff383c] text-[12px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        13.4%
      </p>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex gap-[3px] items-end relative shrink-0 w-full">
      <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[24px] text-nowrap text-white">3</p>
      <Frame15 />
    </div>
  );
}

function Frame28() {
  return (
    <Wrapper>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[18px] text-white w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Errors
      </p>
      <Frame56 />
    </Wrapper>
  );
}

function Frame30() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-end size-full">
        <div className="content-end flex flex-wrap gap-[0px_9px] items-end px-[32px] py-0 relative w-full">
          <Frame25 />
          <Frame26 />
          <Frame27 />
          <Frame28 />
          <Text7 text="In Review" />
          <Text7 text="Ready for QA" />
        </div>
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex items-center justify-center px-[32px] py-0 relative shrink-0">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[20px] text-nowrap text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
        Test Case
      </p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <Text9 text="Test Name" additionalClassNames="w-full" />
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <Wrapper2 additionalClassNames="bg-[rgba(255,255,255,0.1)] rounded-[6px]">
      <div className="content-stretch flex items-center px-[11px] py-[14px] relative w-full">
        <Text8 text="S.no" additionalClassNames="justify-center w-[65px]" />
        <Frame32 />
        <Text9 text="TimeStamp" additionalClassNames="shrink-0 w-[247px]" />
        <Text9 text="Status" additionalClassNames="shrink-0 w-[207px]" />
        <Text8 text="Mismatch %" additionalClassNames="w-[137px]" />
        <Text9 text="Duration" additionalClassNames="shrink-0 w-[219px]" />
        <Text9 text="Action" additionalClassNames="shrink-0 w-[125px]" />
      </div>
    </Wrapper2>
  );
}

function Container() {
  return (
    <div className="bg-[#00c950] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container />
      <TextText text="PASS" />
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container1 />
      </div>
    </div>
  );
}

function Frame58() {
  return (
    <Wrapper1>
      <Text10 text="01" />
      <Text11 text="HomeScreen" />
      <Text12 text="12/1/2025 at 7:28 PM" additionalClassNames="w-[247px]" />
      <Frame57 />
      <Text13 text="33.33%" />
      <Text12 text="8m 12 sec" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container2() {
  return (
    <div className="bg-[#00c950] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container2 />
      <TextText text="PASS" />
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container3 />
      </div>
    </div>
  );
}

function Frame60() {
  return (
    <Wrapper1>
      <Text10 text="02" />
      <Text11 text="ProfilePage" />
      <Text12 text="12/1/2025 at 7:45 PM" additionalClassNames="w-[247px]" />
      <Frame59 />
      <Text13 text="20.00%" />
      <Text12 text="10m 5 sec" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container4() {
  return (
    <div className="bg-[red] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container4 />
      <TextText1 text="FAIL" />
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container5 />
      </div>
    </div>
  );
}

function Frame62() {
  return (
    <Wrapper1>
      <Text10 text="03" />
      <Text11 text="Settings" />
      <Text12 text="12/1/2025 at 8:00 PM" additionalClassNames="w-[247px]" />
      <Frame61 />
      <Text13 text="75.00%" />
      <Text12 text="5m 30 sec" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container6() {
  return (
    <div className="bg-[red] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container6 />
      <TextText1 text="FAIL" />
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container7 />
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <Wrapper1>
      <Text10 text="04" />
      <Text11 text="Notifications" />
      <Text12 text="12/1/2025 at 8:15 PM" additionalClassNames="w-[247px]" />
      <Frame63 />
      <Text13 text="50.00%" />
      <Text12 text="4m 45 sec" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container8() {
  return (
    <div className="bg-[#00c950] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container8 />
      <TextText text="PASS" />
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container9 />
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <Wrapper1>
      <Text10 text="05" />
      <Text11 text="Messages" />
      <Text12 text="12/1/2025 at 8:30 PM" additionalClassNames="w-[247px]" />
      <Frame64 />
      <Text13 text="30.00%" />
      <Text12 text="3m 20 sec" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container10() {
  return (
    <div className="bg-[red] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container10 />
      <TextText1 text="FAIL" />
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container11 />
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <Wrapper1>
      <Text10 text="06" />
      <Text11 text="Dashboard" />
      <Text12 text="12/1/2025 at 8:45 PM" additionalClassNames="w-[247px]" />
      <Frame65 />
      <Text13 text="90.00%" />
      <Text12 text="2m 15 sec" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container12() {
  return (
    <div className="bg-[red] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container12 />
      <TextText1 text="FAIL" />
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container13 />
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <Wrapper1>
      <Text10 text="07" />
      <Text11 text="HelpCenter" />
      <Text12 text="12/1/2025 at 9:00 PM" additionalClassNames="w-[247px]" />
      <Frame66 />
      <Text13 text="65.00%" />
      <Text12 text="6m 5 sec" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container14() {
  return (
    <div className="bg-[#00c950] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container14 />
      <TextText text="PASS" />
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container15 />
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <Wrapper1>
      <Text10 text="08" />
      <Text11 text="AboutUs" />
      <Text12 text="12/1/2025 at 9:15 PM" additionalClassNames="w-[247px]" />
      <Frame67 />
      <Text13 text="10.00%" />
      <Text12 text="8m 50 sec" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container16() {
  return (
    <div className="bg-[#0886df] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Text() {
  return (
    <Wrapper3>
      <p className="font-['Consolas:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0886df] text-[16px] text-nowrap">Running</p>
    </Wrapper3>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container16 />
      <Text />
    </div>
  );
}

function Frame68() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container17 />
      </div>
    </div>
  );
}

function Frame38() {
  return (
    <Wrapper1>
      <Text10 text="09" />
      <Text11 text="TermsOfService" />
      <Text12 text="12/1/2025 at 9:30 PM" additionalClassNames="w-[247px]" />
      <Frame68 />
      <Text13 text="--.--%" />
      <Text12 text="7m 30 sec" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container18() {
  return (
    <div className="bg-[#808080] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container18 />
      <TextText2 text="In Queue" />
    </div>
  );
}

function Frame69() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container19 />
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <Wrapper1>
      <Text10 text="10" />
      <Text11 text="PrivacyPolicy" />
      <Text12 text="12/1/2025 at 9:45 PM" additionalClassNames="w-[247px]" />
      <Frame69 />
      <Text13 text="--.--%" />
      <Text12 text="--:--" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container20() {
  return (
    <div className="bg-[#808080] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container20 />
      <TextText2 text="In Queue" />
    </div>
  );
}

function Frame70() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container21 />
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <Wrapper1>
      <Text10 text="11" />
      <Text11 text="Feedback" />
      <Text12 text="12/1/2025 at 10:00 PM" additionalClassNames="w-[247px]" />
      <Frame70 />
      <Text13 text="--.--%" />
      <Text12 text="--:--" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container22() {
  return (
    <div className="bg-[#808080] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container22 />
      <TextText2 text="In Queue" />
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container23 />
      </div>
    </div>
  );
}

function Frame72() {
  return (
    <Wrapper1>
      <Text10 text="12" />
      <Text11 text="Search" />
      <Text12 text="12/1/2025 at 10:15 PM" additionalClassNames="w-[247px]" />
      <Frame71 />
      <Text13 text="--.--%" />
      <Text12 text="--:--" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container24() {
  return (
    <div className="bg-[#808080] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container24 />
      <TextText2 text="In Queue" />
    </div>
  );
}

function Frame73() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container25 />
      </div>
    </div>
  );
}

function Frame42() {
  return (
    <Wrapper1>
      <Text10 text="13" />
      <Text11 text="Favorites" />
      <Text12 text="12/1/2025 at 10:30 PM" additionalClassNames="w-[247px]" />
      <Frame73 />
      <Text13 text="--.--%" />
      <Text12 text="--:--" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container26() {
  return (
    <div className="bg-[#808080] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container26 />
      <TextText2 text="In Queue" />
    </div>
  );
}

function Frame74() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container27 />
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <Wrapper1>
      <Text10 text="14" />
      <Text11 text="ContactSupport" />
      <Text12 text="12/1/2025 at 10:45 PM" additionalClassNames="w-[247px]" />
      <Frame74 />
      <Text13 text="--.--%" />
      <Text12 text="--:--" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container28() {
  return (
    <div className="bg-[#808080] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container28 />
      <TextText2 text="In Queue" />
    </div>
  );
}

function Frame75() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container29 />
      </div>
    </div>
  );
}

function Frame44() {
  return (
    <Wrapper1>
      <Text10 text="15" />
      <Text11 text="Logout" />
      <Text12 text="12/1/2025 at 11:00 PM" additionalClassNames="w-[247px]" />
      <Frame75 />
      <Text13 text="--.--%" />
      <Text12 text="--:--" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container30() {
  return (
    <div className="bg-[#808080] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container30 />
      <TextText2 text="In Queue" />
    </div>
  );
}

function Frame76() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container31 />
      </div>
    </div>
  );
}

function Frame45() {
  return (
    <Wrapper1>
      <Text10 text="16" />
      <Text11 text="UserGuide" />
      <Text12 text="12/1/2025 at 11:15 PM" additionalClassNames="w-[247px]" />
      <Frame76 />
      <Text13 text="--.--%" />
      <Text12 text="--:--" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container32() {
  return (
    <div className="bg-[#808080] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container32 />
      <TextText2 text="In Queue" />
    </div>
  );
}

function Frame77() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container33 />
      </div>
    </div>
  );
}

function Frame46() {
  return (
    <Wrapper1>
      <Text10 text="17" />
      <Text11 text="AccountSettings" />
      <Text12 text="12/1/2025 at 11:30 PM" additionalClassNames="w-[247px]" />
      <Frame77 />
      <Text13 text="--.--%" />
      <Text12 text="--:--" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container34() {
  return (
    <div className="bg-[#808080] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container34 />
      <TextText2 text="In Queue" />
    </div>
  );
}

function Frame78() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container35 />
      </div>
    </div>
  );
}

function Frame47() {
  return (
    <Wrapper1>
      <Text10 text="18" />
      <Text11 text="Security" />
      <Text12 text="12/1/2025 at 11:45 PM" additionalClassNames="w-[247px]" />
      <Frame78 />
      <Text13 text="--.--%" />
      <Text12 text="--:--" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container36() {
  return (
    <div className="bg-[#808080] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container36 />
      <TextText2 text="In Queue" />
    </div>
  );
}

function Frame79() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container37 />
      </div>
    </div>
  );
}

function Frame48() {
  return (
    <Wrapper1>
      <Text10 text="19" />
      <Text11 text="LanguageSettings" />
      <Text12 text="12/1/2025 at 11:50 PM" additionalClassNames="w-[247px]" />
      <Frame79 />
      <Text13 text="--.--%" />
      <Text12 text="--:--" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container38() {
  return (
    <div className="bg-[#808080] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container38 />
      <TextText2 text="In Queue" />
    </div>
  );
}

function Frame80() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container39 />
      </div>
    </div>
  );
}

function Frame49() {
  return (
    <Wrapper1>
      <Text10 text="20" />
      <Text11 text="Accessibility" />
      <Text12 text="12/1/2025 at 11:55 PM" additionalClassNames="w-[247px]" />
      <Frame80 />
      <Text13 text="--.--%" />
      <Text12 text="--:--" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container40() {
  return (
    <div className="bg-[#808080] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container40 />
      <TextText2 text="In Queue" />
    </div>
  );
}

function Frame81() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container41 />
      </div>
    </div>
  );
}

function Frame50() {
  return (
    <Wrapper1>
      <Text10 text="21" />
      <Text11 text="AppUpdates" />
      <Text12 text="12/2/2025 at 12:00 AM" additionalClassNames="w-[247px]" />
      <Frame81 />
      <Text13 text="--.--%" />
      <Text12 text="--:--" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container42() {
  return (
    <div className="bg-[#808080] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container42 />
      <TextText2 text="In Queue" />
    </div>
  );
}

function Frame82() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container43 />
      </div>
    </div>
  );
}

function Frame51() {
  return (
    <Wrapper1>
      <Text10 text="22" />
      <Text11 text="LogoutConfirmation" />
      <Text12 text="12/2/2025 at 12:05 AM" additionalClassNames="w-[247px]" />
      <Frame82 />
      <Text13 text="--.--%" />
      <Text12 text="--:--" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container44() {
  return (
    <div className="bg-[#808080] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container44 />
      <TextText2 text="In Queue" />
    </div>
  );
}

function Frame83() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container45 />
      </div>
    </div>
  );
}

function Frame52() {
  return (
    <Wrapper1>
      <Text10 text="23" />
      <Text11 text="SessionTimeout" />
      <Text12 text="12/2/2025 at 12:10 AM" additionalClassNames="w-[247px]" />
      <Frame83 />
      <Text13 text="--.--%" />
      <Text12 text="--:--" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container46() {
  return (
    <div className="bg-[#808080] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container46 />
      <TextText2 text="In Queue" />
    </div>
  );
}

function Frame84() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container47 />
      </div>
    </div>
  );
}

function Frame53() {
  return (
    <Wrapper1>
      <Text10 text="24" />
      <Text11 text="UserFeedback" />
      <Text12 text="12/2/2025 at 12:15 AM" additionalClassNames="w-[247px]" />
      <Frame84 />
      <Text13 text="--.--%" />
      <Text12 text="--:--" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Container48() {
  return (
    <div className="bg-[#808080] relative rounded-[100px] shrink-0 size-[8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center px-[8px] py-0 relative rounded-[4px] shrink-0" data-name="Container">
      <Container48 />
      <TextText2 text="In Queue" />
    </div>
  );
}

function Frame85() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0 w-[207px]">
      <div className="flex flex-row items-center self-stretch">
        <Container49 />
      </div>
    </div>
  );
}

function Frame54() {
  return (
    <Wrapper1>
      <Text10 text="25" />
      <Text11 text="VersionHistory" />
      <Text12 text="12/2/2025 at 12:20 AM" additionalClassNames="w-[247px]" />
      <Frame85 />
      <Text13 text="--.--%" />
      <Text12 text="--:--" additionalClassNames="w-[219px]" />
      <Helper />
    </Wrapper1>
  );
}

function Frame86() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px overflow-x-clip overflow-y-auto relative shrink-0 w-full">
      <Frame58 />
      <Frame60 />
      <Frame62 />
      <Frame33 />
      <Frame34 />
      <Frame35 />
      <Frame36 />
      <Frame37 />
      <Frame38 />
      <Frame39 />
      <Frame40 />
      <Frame72 />
      <Frame42 />
      <Frame43 />
      <Frame44 />
      <Frame45 />
      <Frame46 />
      <Frame47 />
      <Frame48 />
      <Frame49 />
      <Frame50 />
      <Frame51 />
      <Frame52 />
      <Frame53 />
      <Frame54 />
    </div>
  );
}

function Frame87() {
  return (
    <div className="h-[554px] relative shrink-0 w-full">
      <div className="flex flex-col items-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end px-[32px] py-0 relative size-full">
          <Frame31 />
          <Frame86 />
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip px-0 py-[24px] relative shrink-0 w-full">
      <Frame30 />
      <Frame41 />
      <Frame87 />
    </div>
  );
}

export default function ResultTab() {
  return (
    <div className="bg-black content-stretch flex flex-col gap-[2px] items-start relative size-full" data-name="result tab">
      <Frame9 />
      <Frame16 />
      <Frame23 />
    </div>
  );
}