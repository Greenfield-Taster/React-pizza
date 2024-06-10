import { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useForm, useFieldArray } from "react-hook-form";

function PizzaForm({ onSubmit, defaultValues }) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    control,
  } = useForm({
    defaultValues,
  });

  const {
    fields: typeFields,
    remove: removeType,
    append: appendType,
  } = useFieldArray({ control, name: "types" });

  const {
    fields: sizeFields,
    remove: removeSize,
    append: appendSize,
  } = useFieldArray({ control, name: "sizes" });

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
      <div className="addPizzaFormWrapper">
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
                {...register("imageUrl", { required: "ImageURL is required" })}
              />
              {errors.imageUrl && (
                <p className="errorText">{errors.imageUrl.message}</p>
              )}
            </div>

            <div className="typesComponent">
              <label>Types[]</label>
              <div>
                {typeFields.map((item, index) => (
                  <div key={item.id}>
                    <input
                      placeholder="0"
                      type="text"
                      {...register(`types.${index}`)}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        removeType(index);
                      }}
                      className=" button--adminRemove"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendType("")}
                  className="button--adminAdd"
                >
                  Add Type
                </button>
              </div>
            </div>

            <div className="sizesComponent">
              <label>Sizes[]</label>
              <div>
                {sizeFields.map((item, index) => (
                  <div key={item.id}>
                    <input
                      placeholder="15"
                      type="text"
                      {...register(`sizes.${index}`)}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        removeSize(index);
                      }}
                      className=" button--adminRemove"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendSize("")}
                  className="button--adminAdd"
                >
                  Add Size
                </button>
              </div>
            </div>
          </div>

          <div className="price-rating">
            <div className="priceComponent">
              <input
                placeholder="200"
                type="text"
                {...register("price", { required: "Price is required" })}
              />
              {errors.price && (
                <p className="errorText">{errors.price.message}</p>
              )}
            </div>

            <div className="categoryComponent">
              <label>Category</label>{" "}
              <input
                placeholder="0"
                {...register("category", { required: "Caregory is required" })}
              />
              {errors.category && (
                <p className="errorText">{errors.category.message}</p>
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
      </div>
      <button type="sumbit" className="button">
        Save changes
      </button>
    </form>
  );
}

export default PizzaForm;
