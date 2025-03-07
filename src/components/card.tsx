export default function Card({ CName, onClick }: { CName: string, onClick?: VoidFunction }) {
  if (CName === "") {
    return;
  }
  return (
    <button
      style={{ backgroundColor: "grey", height: 300, width: 200 }}
      onClick={() => onClick ? onClick() : console.log(CName)}
    >
      <span style={{ color: "black" }}>{CName}</span>
    </button>
  );
}
