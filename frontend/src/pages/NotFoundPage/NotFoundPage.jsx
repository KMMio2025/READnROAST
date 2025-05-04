import CoffeeEmojiImg from "../../assets/img/coffeeEmoji.png";
import { Heading, Image, Message, NotFoundWrapper } from "./NotFoundPageStyles";

export default function NotFoundPage() {
  return (
    <NotFoundWrapper>
      <Heading>Page not found</Heading>
      <Image src={CoffeeEmojiImg} alt="coffee with steam" />
      <Message>use navbar to navigate to other page</Message>
    </NotFoundWrapper>
  );
}
