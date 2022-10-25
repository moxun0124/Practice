import styles from "./App.module.css"
import comment from "./Comment.module.css"
import rate from "./Rate.module.css"

import { ReactComponent as IconStar } from "./images/icon-star.svg"
import PictureColton from "./images/image-colton.jpg"
import PictureIrene from "./images/image-irene.jpg"
import PictureAnne from "./images/image-anne.jpg"

function Title({ value }) {
  return <h1 className={styles.title}>{value}</h1>
}

function Description({ children }) {
  return <p className={styles.description}>{children}</p>
}

function Rate({ content }) {
  return (
    <div className={rate.rate}>
      <ul>
        <li>
          <IconStar />
        </li>
        <li>
          <IconStar />
        </li>
        <li>
          <IconStar />
        </li>
        <li>
          <IconStar />
        </li>
        <li>
          <IconStar />
        </li>
      </ul>
      <strong>{content}</strong>
    </div>)
}

function Comment({ person }) {
  return (
    <div className={comment.comment}>
      <header>
        <img className={comment.avatar}
          src={person.avatar} alt="picture" />
        <div className={comment.user}>
          <strong>{person.name}</strong>
          <span>{person.verified?"Verified Buyer":"Not Verified Buyer"}</span>
        </div>
      </header>
      <p>{person.content}</p>
    </div>
  )
}


function App() {
  const rates = [
    { content: "Rated 5 Stars in Reviews", },
    { content: "Rated 5 Stars in Report Guru", },
    { content: "Rated 5 Stars in BestTech", },
  ];

  const comments = [
    {
      name: 'Colton Smith',
      avatar: PictureColton,
      verified:true,
      content: "We needed the same printed design as the one we had ordered a week prior. Not only did they find the original order, but we also received it in time. Excellent!",
    },
    {
      name: 'Irene Roberts',
      avatar: PictureIrene,
      verified:true,
      content: "Customer service is always excellent and very quick turn around. Completely delighted with the simplicity of the purchase and the speed of delivery.",
    },
    {
      name: 'Anne Wallace',
      avatar: PictureAnne,
      verified:true,
      content: "Put an order with this company and can only praise them for the very high standard. Will definitely use them again and recommend them to everyone!",
    }
  ]


  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Title value="10,000+ of our users love our products." />
        <Description children="We only provide great products combined with excellent customer service. See what our satisfied customers are saying about our services." />
      </header>
      <ul className={styles.list + " " + styles.rate}>
        {rates.map(e => <li key={e}><Rate content={e.content} /></li>)}
      </ul>
      <ul className={styles.list + " " + styles.comment}>
        {
          comments.map(e => <li key={e}><Comment person={e}/></li>)
        }
      </ul>
    </main>
  )
}

export default App;
