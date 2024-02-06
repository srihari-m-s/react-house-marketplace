import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "../ui/button";

export default function TestUsers() {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button className="text-base w-full">
          Click here for Test Credentials
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="grid gap-4 pt-4">
        {/* Test 1 */}
        <div className="">
          <h3>Test Credential - 1</h3>
          <ul className="list-disc px-4">
            <li>Email: testuser@example.com</li>
            <li>Password: testuserqwerty</li>
          </ul>
        </div>
        {/* Test 2 */}
        <div className="">
          <h3>Test Credential - 2</h3>
          <ul className="list-disc px-4">
            <li>Email: testuser@example.com</li>
            <li>Password: testuserqwerty</li>
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
