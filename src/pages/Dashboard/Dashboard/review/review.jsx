import { useState } from "react"
import { Star, Edit, Trash2, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const mockReviews = [
    {
      id: 1,
      name: "Burger Palace",
      type: "restaurant",
      rating: 4,
      text: "Great burgers and friendly service!",
      date: "2023-06-15",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      type: "dish",
      rating: 5,
      text: "The best pizza I've ever had!",
      date: "2023-06-10",
    },
    {
      id: 3,
      name: "Sushi Haven",
      type: "restaurant",
      rating: 3,
      text: "Decent sushi, but a bit pricey.",
      date: "2023-06-05",
    },
  ];

export const Review = () => {
    const [reviews, setReviews] = useState(mockReviews);

    const deleteReview = (id) => {
        setReviews(reviews.filter((review) => review.id !== id))
    };

    return (
        <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Reviews</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Write New Review
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Write a New Review</DialogTitle>
                <DialogDescription>Share your experience about a restaurant or dish.</DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Restaurant or Dish Name</Label>
                  <Input id="name" placeholder="Enter name" />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <select id="type" className="w-full border rounded-md p-2">
                    <option value="restaurant">Restaurant</option>
                    <option value="dish">Dish</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input id="rating" type="number" min="1" max="5" placeholder="Rate from 1 to 5" />
                </div>
                <div>
                  <Label htmlFor="review">Your Review</Label>
                  <Textarea id="review" placeholder="Write your review here" />
                </div>
              </form>
              <DialogFooter>
                <Button type="submit">Submit Review</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
  
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>{review.name}</span>
                  <span className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </span>
                </CardTitle>
                <CardDescription>
                  {review.type} • Reviewed on {review.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{review.text}</p>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Your Review</DialogTitle>
                      <DialogDescription>Make changes to your review for {review.name}.</DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor={`rating-${review.id}`}>Rating</Label>
                        <Input id={`rating-${review.id}`} type="number" min="1" max="5" defaultValue={review.rating} />
                      </div>
                      <div>
                        <Label htmlFor={`review-${review.id}`}>Your Review</Label>
                        <Textarea id={`review-${review.id}`} defaultValue={review.text} />
                      </div>
                    </form>
                    <DialogFooter>
                      <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" size="sm" onClick={() => deleteReview(review.id)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
};