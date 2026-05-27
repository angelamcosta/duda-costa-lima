interface FooterPrimary {
  copy: string;
  legal: string;
  built: string;
}

interface Props {
  primary: FooterPrimary;
}

export function FooterSlice({ primary }: Props) {
  return (
    <footer className="footer frame">
      <span>{primary.copy}</span>
      <span>{primary.legal}</span>
      <span>{primary.built}</span>
    </footer>
  );
}
