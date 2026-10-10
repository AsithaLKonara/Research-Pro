export function ComparisonTable() {
  return (
    <div className="card p-6 md:p-8 overflow-x-auto">
      <h3 className="text-xl font-bold mb-4">03. Side-by-side Comparison</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Key Feature 1</th>
            <th>Key Feature 2</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((row) => (
            <tr key={row}>
              <td className="highlight">Product Model {row}</td>
              <td>$999</td>
              <td>4.{8 - row}/5</td>
              <td>Value {row}A</td>
              <td>Value {row}B</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
