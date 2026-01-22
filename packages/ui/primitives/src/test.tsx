import { Button } from "./ui/buttons/button";
import { Accordion } from "./ui/disclosure/accordion";

export const AccordionTest = () => {
  return (
    <>
			<Button variant="solid" intent="primary" size="xs" stretched>test</Button>
			<Button variant="outline" intent="primary" size="xs" stretched>test</Button>
			<Button variant="ghost" intent="primary" size="xs" stretched>test</Button>
			<Button variant="link" intent="primary" size="xs" stretched>test</Button>
			<Button variant="solid" intent="critical" size="xs" stretched>test</Button>
			<Button variant="outline" intent="critical" size="xs" stretched>test</Button>
			<Button variant="ghost" intent="critical" size="xs" stretched>test</Button>
			<Button variant="link" intent="caution" size="xs" stretched>test</Button>
			<Button variant="solid" intent="positive" size="xs" stretched>test</Button>
			<Button variant="outline" intent="positive" size="xs" stretched>test</Button>
			<Button variant="ghost" intent="positive" size="xs" stretched>test</Button>

      <Accordion.Root>
        <Accordion.Item value="1">
          <Accordion.Trigger>
            test
            <Accordion.Indicator />
          </Accordion.Trigger>

          <Accordion.Content pb={"md"}>content</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
};
