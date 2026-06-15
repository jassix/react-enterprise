import { Link } from "@tanstack/react-router";

import { Button, useTheme } from "@lume/primitives";

export function HomePage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main>
      <h1>Platform</h1>
      <Button variant="default">Hello from @lume/primitives</Button>
      <p>
        <Button variant="outline" onClick={toggleTheme}>
          Theme: {theme} (toggle)
        </Button>
      </p>
      <p>
        <Link to="/billing">Billing demo →</Link>
      </p>
    </main>
  );
}
