import imgFigmaExportedScreenshot from "figma:asset/305b085682cd32be378ff0fc5cc52f4a6326f971.png";

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[3px] shrink-0 size-[16px]">
      <p className="font-['Font_Awesome_6_Pro:Light',sans-serif] leading-[normal] not-italic relative shrink-0 text-[12px] text-white w-[2.913px]">ellipsis-vertical</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[normal] overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-nowrap text-white w-[190.953px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Homescreen live rail first card.png
      </p>
      <Frame2 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="container">
      <div className="aspect-[1920/1080] relative rounded-[3px] shrink-0 w-full" data-name="figma exported screenshot">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[3px] size-full" src={imgFigmaExportedScreenshot} />
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[8px] size-full">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center overflow-clip p-[6px] relative size-full">
          <Frame1 />
          <Container />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}