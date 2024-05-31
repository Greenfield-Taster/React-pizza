import { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useForm } from "react-hook-form";

function PizzaForm({ onSubmit, defaultValues }) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <form
      action="pizzaBuilder"
      onSubmit={handleSubmit(onSubmit)}
      className="addPizzaBlockForm"
    >
      <div className="addPizzaBlockTitle">
        <input
          placeholder="Title"
          type="text"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="errorText">{errors.title.message}</p>}
      </div>

      <div className="addPizzaBlockComponents">
        <div className="leftComponents">
          <div className="imageURLComponent">
            <input
              placeholder="Image URL"
              type="url"
              {...register("imageURL", { required: "ImageURL is required" })}
            />
            {errors.imageURL && (
              <p className="errorText">{errors.imageURL.message}</p>
            )}
          </div>

          <div className="typesComponent">
            <label>Types[]</label>
            <div>
              <input placeholder="Types" type="text" />
            </div>
          </div>

          <div className="sizesComponent">
            <label>Sizes[]</label>
            <input placeholder="Size" type="text" />
          </div>
        </div>

        <div className="price-rating">
          <div className="priceComponent">
            <input
              placeholder="Price"
              type="text"
              {...register("price", { required: "Price is required" })}
            />
            {errors.price && (
              <p className="errorText">{errors.price.message}</p>
            )}
          </div>

          <div className="retingComponent">
            <label>Rating</label>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={34}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
          </div>
        </div>
      </div>
      {/* <button type="submit">Add</button> */}
    </form>
  );
}

export default PizzaForm;
