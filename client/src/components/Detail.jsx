
export default function Detail({ details }) {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold">Type: {details.type}</h3>
      <div className="ml-2">
        <ul className="list-disc pl-4">
          <li>Minimum Amount: ${details.min}</li>
          <li>Maximum Amount: ${details.max}</li>
          <li>Tenure: {details.tenure} (days/month)</li>
        </ul>
      </div>
      <hr className="my-2" />
    </div>
  );
}
