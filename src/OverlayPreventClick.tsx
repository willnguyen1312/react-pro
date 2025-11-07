import { useEffect, useState } from "react";
import "./OverlayPreventClick.css";

const OverlayPreventClick = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div
        className="overlay-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
      >
        {children}
      </div>
    </div>
  );
};

const App = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const openOverlay = () => setIsOverlayOpen(true);
  const closeOverlay = () => setIsOverlayOpen(false);

  return (
    <div className="app">
      <div className="main-content">
        <h1>Main Content</h1>
        <button onClick={openOverlay}>Show Overlay</button>
        <p>This content will be blocked when overlay is active.</p>

        <button>Another Button</button>
        <input type="text" placeholder="This input will be blocked" />
      </div>

      <OverlayPreventClick isOpen={isOverlayOpen} onClose={closeOverlay}>
        <h2>Overlay Content</h2>
        <p>This overlay prevents interaction with underlying elements.</p>
        <button onClick={closeOverlay}>Close</button>
      </OverlayPreventClick>
    </div>
  );
};

export default App;
