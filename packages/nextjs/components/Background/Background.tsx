function Background({ rows }) {
  const squares = Array.from({ length: rows }, (_, index) => index);
  return (
    <div style={{ height: `${rows * 40}px`, display: "flex", flexWrap: "wrap" }}>
      {squares.map(square => (
        <div
          key={square}
          style={{
            width: "40px",
            height: "40px",
            border: "1px solid black",
            boxSizing: "border-box",
          }}
        />
      ))}
    </div>
  );
}

export default Background;
