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
  demonstration?: Demonstration;
}

const DemonstrationCard = ({ demonstration }: IDemonstrationCardProps) => {
  const { title, description, date, location, image, website } = demonstration!;

  return (
    demonstration && (
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
              style={{
                fontSize: 14,
                maxWidth: 300,
                lineHeight: "1.4em", // Example line height
                maxHeight: "5.7em", // 1.4em (line height) * 3 (number of lines)
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
              }}
            >
              {description}
            </span>
          </Stack>
        </CardBody>
        <CardFooter>
          <Stack spacing={3}>
            <div className="flex-row flex items-center mt-5">
              <Text color="blue.600" className="lg:font-xl sm:font-md">
                <FaRegCalendarAlt size={20} />
              </Text>
              <Text color="blue.600" className="lg:font-xl sm:font-md" pl={2}>
                {date}
              </Text>
            </div>
            <div className="flex-row flex items-center  ">
              <Text color="blue.600" className="lg:font-xl sm:font-md">
                <IoLocation size={20} />
              </Text>
              <Text color="blue.600" className="lg:font-xl sm:font-md" pl={2}>
                {location}
              </Text>
            </div>
            <ButtonGroup spacing="2">
              <Link href={website} target="_blank">
                <Button variant="solid" colorScheme="green" cursor={"pointer"}>
                  Learn More
                </Button>
              </Link>
            </ButtonGroup>
          </Stack>
        </CardFooter>
      </Card>
    )
  );
};
export default DemonstrationCard;
