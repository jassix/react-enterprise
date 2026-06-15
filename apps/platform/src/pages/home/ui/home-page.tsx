import { Link } from "@tanstack/react-router";

import { Button } from "@lume/primitives";

export function HomePage() {
  return (
    <main>
      <h1>Platform</h1>
      <Button variant="default">Hello from @lume/primitives</Button>
      <p>
        <Link to="/billing">Billing demo →</Link>
      </p>
    </main>
  );
}
