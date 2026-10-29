export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <>
      {([] as object[]).concat(data).map((item, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}
