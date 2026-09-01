// Small presentational components keep the project dependency-free. They are
// ordinary React components that receive className just like any other prop.
const symbols = {
  ArrowLeft: '←', ArrowRight: '→', ArrowUpRight: '↗', Bookmark: '🔖',
  Briefcase: '💼', CheckCircle: '✓', CheckCircle2: '✓', Clock3: '◷',
  Filter: '⚙', Github: '◉', Linkedin: 'in', Mail: '✉', MapPin: '⌖',
  Menu: '☰', Moon: '☾', Phone: '☎', Rocket: '🚀', Search: '⌕',
  Send: '➤', Share2: '↗', Sparkles: '✦', Star: '★', Sun: '☀',
  Target: '◎', TrendingUp: '↗', Twitter: '𝕏', Users: '👥', X: '×', Zap: '⚡',
}

function makeIcon(symbol) {
  return function Icon({ className = '', ...props }) {
    return <span className={className} aria-hidden="true" {...props}>{symbol}</span>
  }
}

export const ArrowLeft = makeIcon(symbols.ArrowLeft)
export const ArrowRight = makeIcon(symbols.ArrowRight)
export const ArrowUpRight = makeIcon(symbols.ArrowUpRight)
export const Bookmark = makeIcon(symbols.Bookmark)
export const Briefcase = makeIcon(symbols.Briefcase)
export const CheckCircle = makeIcon(symbols.CheckCircle)
export const CheckCircle2 = makeIcon(symbols.CheckCircle2)
export const Clock3 = makeIcon(symbols.Clock3)
export const Filter = makeIcon(symbols.Filter)
export const Github = makeIcon(symbols.Github)
export const Linkedin = makeIcon(symbols.Linkedin)
export const Mail = makeIcon(symbols.Mail)
export const MapPin = makeIcon(symbols.MapPin)
export const Menu = makeIcon(symbols.Menu)
export const Moon = makeIcon(symbols.Moon)
export const Phone = makeIcon(symbols.Phone)
export const Rocket = makeIcon(symbols.Rocket)
export const Search = makeIcon(symbols.Search)
export const Send = makeIcon(symbols.Send)
export const Share2 = makeIcon(symbols.Share2)
export const Sparkles = makeIcon(symbols.Sparkles)
export const Star = makeIcon(symbols.Star)
export const Sun = makeIcon(symbols.Sun)
export const Target = makeIcon(symbols.Target)
export const TrendingUp = makeIcon(symbols.TrendingUp)
export const Twitter = makeIcon(symbols.Twitter)
export const Users = makeIcon(symbols.Users)
export const X = makeIcon(symbols.X)
export const Zap = makeIcon(symbols.Zap)
