import { Demonstration } from "@/constants";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

import { IoLocation } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";

interface IDemonstrationCardProps {
  demonstration: Demonstration;
}

const DemonstrationCard = ({ demonstration }: IDemonstrationCardProps) => {
  const { title, description, date, location, image, website } = demonstration;

  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={image.src}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <span
            style={{ fontSize: 14, maxHeight: 50, minHeight: 50 }}
            className="mb-4"
          >
            {description}
          </span>
          <div className="flex-row flex items-center mt-">
            <Text color="blue.600" fontSize="xl">
              <FaRegCalendarAlt size={20} />
            </Text>
            <Text color="blue.600" fontSize="xl" pl={2} >
              {date}
            </Text>
          </div>
          <div className="flex-row flex items-center ">
            <Text color="blue.600" fontSize="xl">
              <IoLocation size={20} />
            </Text>
            <Text color="blue.600" fontSize="xl" pl={2}>
              {location}
            </Text>
          </div>
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="2">
          <Link
            href="https://www.projectpalestine.org/demonstrations/loveforjustice"
            target="_blank"
          >
            <Button variant="solid" colorScheme="green">
              Learn More
            </Button>
          </Link>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
export default DemonstrationCard;
