import { ICharacter } from "../../interfaces/character.interface";
import { IQuote } from "../../interfaces/quote.interface";
import "./Quote.scss"

type QuoteProps = {
    quote: IQuote,
    character: ICharacter | undefined
}

const Quote = ({ quote, character }: QuoteProps) => {
    return (
        <div className="quote">
            <blockquote>{quote.dialog}</blockquote>
            <div className="character-name">{character?.name}</div>
        </div>
    )
}

export default Quote;