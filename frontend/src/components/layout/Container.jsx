// Wrap page content that should NOT go full-bleed (Works, Bio, Events,
// Cart, Checkout, Orders, etc.) — anything not opting into an edge-to-edge
// hero. Layout.jsx itself is now unpadded/full-width for that reason.
export default function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto max-w-6xl px-6 py-16 md:px-10 ${className}`}>
      {children}
    </div>
  );
}