import { Fragment } from "react";

const ITEMS = [
  "TELEGRAM",
  "DISCORD",
  "SLACK",
  "WHATSAPP",
  "SIGNAL",
  "邮件",
  "CLI",
  "网关",
  "网页搜索",
  "浏览器自动化",
];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" id="marqueeTrack">
        {/* Content duplicated once so the -50% keyframe loops seamlessly,
            matching `track.innerHTML = half + half` in the vanilla page. */}
        {[0, 1].map((copy) => (
          <Fragment key={copy}>
            {ITEMS.map((item) => (
              <Fragment key={item}>
                <span>{item}</span>
                <b>/</b>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
