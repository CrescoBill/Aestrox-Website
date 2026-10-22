import logo from "@/assets/aestrox-logo-clean.png";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <img
      className={`brand-logo${light ? " brand-light" : ""}`}
      src={logo}
      alt="Aestrox"
      width={1566}
      height={518}
    />
  );
}
