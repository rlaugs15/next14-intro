import { Server } from "http";

export default function MovieDetail({ params }: { params: { id: number } }) {
  console.log(params.id);

  return <div>MovieDetail</div>;
}
