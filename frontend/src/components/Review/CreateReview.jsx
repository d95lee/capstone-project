import { useDispatch, useSelector } from "react-redux"
import Layout from "../Layout/Layout"
import { useState } from "react"
import './CreateReview.css'
import { createReview } from "../../store/reviewReducer"
import { selectProduct } from "../../store/productReducer"
import { useNavigate, useParams } from "react-router-dom"
import { FaStar } from 'react-icons/fa6'

const CreateReview = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formHeadline, setFormHeadline] = useState('')
    const [formBody, setFormBody] = useState('')
    const [rating, setRating] = useState(null)
    const [mouseHover, setMouseHover] = useState(null)
    const userId = useSelector(state => state.session.id)
    const userEmail = useSelector(state => state.session.email)
    const { productId } = useParams()
    const product = useSelector(selectProduct(productId))
    

    const handleOnSubmit = (e) => {
        e.preventDefault()

    }
    
    const handleOnClick = (e) => {
        e.preventDefault()
        dispatch(createReview({ 
            userId,
            body: formBody,
            productId: productId, // need to get this 
            rating: rating,
            username: userEmail,
            owner: userEmail
        }))
            setFormHeadline('')
            setFormBody('')
            navigate(`/products/${productId}`)
    }
    

    // const handleOnEditClick = (e) => {
    //     e.preventDefault()
    //     dispatch(EditReview({ 
    //         reviewId: reviewId,
    //         userId, 
    //         body: formBody,
    //         productId: productId, // need to get this 
    //         rating: '2 stars',
    //         username: userEmail,
    //         owner: userEmail
    //     }))
    //         setFormHeadline('')
    //         setFormBody('')
    //         navigate(`/products/${productId}`)
    // }
    
    // useEffect(() => {
    //     setFormBody(fetchReview(reviewId).body)
    // }, [setFormBody])

    return (
        <Layout>
            <div className="review-container">
            <form onSubmit={handleOnSubmit}>
                <div>
                    {[...Array(5)].map((star, index) => {     
                        const currentStars = index + 1
                        return (
                    <label key={index}>
                        <input type="radio"
                            name='rating'
                            value={currentStars}
                            onClick={() => setRating(currentStars)}
                            />
                         <FaStar className='review-stars' size={50}
                                color={currentStars <= (mouseHover || rating) ? "#ffc107" : "e4e5e9"}
                                onMouseEnter={() => setMouseHover}
                                onMouseLeave={() => setMouseHover(null)}
                                />
                    </label>
                        )
                       
                    })}
                </div>
            <br />
            <hr />
                <label>Add a headline
                    <input type="text" 
                    value={formHeadline}
                    onChange={(e) => setFormHeadline(e.target.value)}
                    />
                </label>
            <br />
            <hr />
                <label>Add a written review
                    <textarea type="text" 
                    value={formBody}
                    onChange={(e) => setFormBody(e.target.value)}                    
                    />
                </label>

                <hr />
                <button className='add-to-cart-button' onClick={handleOnClick}>Submit</button>
            </form>
            
            </div>
        </Layout>
    )
}

export default CreateReview