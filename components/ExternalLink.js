export default function ExternalLink({
  href,
  children,
  ...passthroughProps
}) {
  return (
    <a {...passthroughProps} href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  );
}