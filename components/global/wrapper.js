export default function Wrapper({ children }) {
    return (
      <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        {children}
      </div>
    );
  }