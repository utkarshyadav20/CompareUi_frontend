import imgFigmaExportedScreenshot from "figma:asset/305b085682cd32be378ff0fc5cc52f4a6326f971.png";

function Frame2() {
  return (
    <div className="aspect-[12/12] bg-[rgba(255,255,255,0.15)] content-stretch flex flex-col h-full items-center justify-center relative rounded-[3px] shrink-0">
      <p className="font-['Font_Awesome_6_Pro:Light',sans-serif] leading-[5px] not-italic relative shrink-0 text-[12px] text-white tracking-[-0.84px] w-[2.913px]">ellipsis-vertical</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[normal] overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-nowrap text-white w-[190.953px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Notifications dropdown.png
      </p>
      <div className="flex flex-row items-center self-stretch">
        <Frame2 />
      </div>
    </div>
  );
}

function ResoulationTagOverlay() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.99)] bottom-[2.94px] content-stretch flex items-center justify-center left-[3px] px-[4px] py-[2px] rounded-[3px]" data-name="resoulation tag overlay">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[8px] text-[rgba(255,255,255,0.8)] text-nowrap tracking-[-0.32px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        1920x1080
      </p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="container">
      <div className="aspect-[1920/1080] relative rounded-[3px] shrink-0 w-full" data-name="figma exported screenshot">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[3px] size-full" src={imgFigmaExportedScreenshot} />
      </div>
      <ResoulationTagOverlay />
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