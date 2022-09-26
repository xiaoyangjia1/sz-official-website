const Personal = () => {
  return <div></div>;
};
export async function getStaticProps({ params }: any) {
  return {
    redirect: {
      destination: "/personal/application",
    },
  };
}
export default Personal;
