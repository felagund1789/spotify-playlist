import { Card, CardBody, Text } from "@chakra-ui/react";

interface Props {
  error: string;
}

export default function ErrorMessage({ error }: Props) {
  return (
    <Card marginTop={5} bgColor="darkred">
      <CardBody>
        <Text color="white">{error}</Text>
      </CardBody>
    </Card>
  );
}
