import imgImage1208 from "figma:asset/305b085682cd32be378ff0fc5cc52f4a6326f971.png";

function Frame1() {
  return (
    <div className="content-stretch flex items-start justify-between leading-[normal] relative shrink-0 text-[12px] text-nowrap w-full">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold overflow-ellipsis overflow-hidden relative shrink-0 text-white w-[190.953px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Homescreen live rail first card.png
      </p>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[rgba(255,255,255,0.2)]" style={{ fontVariationSettings: "'opsz' 14" }}>
        1920x1080
      </p>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[8px] size-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[2px] items-center justify-center overflow-clip p-[6px] relative size-full">
          <Frame1 />
          <div className="aspect-[1920/1080] relative rounded-[3px] shrink-0 w-full" data-name="image 1208">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[3px] size-full" src={imgImage1208} />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}