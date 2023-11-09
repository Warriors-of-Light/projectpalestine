"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@/components/modules";

const ToggleTheme = ({ style }: { style?: string }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  // this useEffect and mount state used to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={style}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "dark" ? (
        <Icon type="sun" style="mr-8 text-white" size={30} />
      ) : (
        <Icon type="moon" style="mr-8" size={30} />
      )}
    </button>
  );
};

export default ToggleTheme;
