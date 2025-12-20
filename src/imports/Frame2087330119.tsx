function Frame() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip px-px py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Font_Awesome_6_Pro:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">ROTATE</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[24px] overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-nowrap text-white" style={{ fontVariationSettings: "'opsz' 9" }}>
          Refresh image
        </p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <Frame />
          <Text />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip px-px py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Font_Awesome_6_Pro:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[12px] text-nowrap text-white">upload</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[24px] overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-nowrap text-white" style={{ fontVariationSettings: "'opsz' 9" }}>
          Replace image
        </p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <Frame1 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip px-px py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Font_Awesome_6_Pro:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[12px] text-[red] text-nowrap">Trash</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[24px] overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-[red] text-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
          Remove screen
        </p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#2d1414] h-[24px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <Frame2 />
          <Text2 />
        </div>
      </div>
    </div>
  );
}

export default function Frame3() {
  return (
    <div className="bg-[#191919] relative rounded-[6px] size-full">
      <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start p-[4px] relative size-full">
          <Button />
          <Button1 />
          <Button2 />
        </div>
      </div>
    </div>
  );
}