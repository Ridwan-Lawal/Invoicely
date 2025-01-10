export function genereteMetadata({ params }) {
  return { title: `Invoice #${params?.invoiceId}` };
}

function Page({ params }) {
  return <div></div>;
}

export default Page;
