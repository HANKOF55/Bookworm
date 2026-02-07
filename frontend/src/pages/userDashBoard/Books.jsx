
import React from "react";
import { Form, Input, Button } from "@heroui/react";

// Example genre list; can be extended as needed
const GENRES = [
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Horror",
  "Non-Fiction",
  "Historical",
  "Biography",
  "Children",
  "Young Adult",
  "Self-Help",
  "Graphic Novel",
  "Poetry"
];

const orangeTheme = {
  "--primary-color": "#ff9800",
  "--primary-hover": "#fb8c00",
  "--primary-foreground": "#fff",
  "--input-focus": "#ff9800",
  "--input-border": "#ff9800"
};

const Books = () => {
  const [submitted, setSubmitted] = React.useState(null);
  const [selectedGenres, setSelectedGenres] = React.useState([]);
  const [selectedCoverFile, setSelectedCoverFile] = React.useState(null);

  const onAddGenre = (e) => {
    const genre = e.target.value;
    if (
      genre &&
      !selectedGenres.includes(genre) &&
      GENRES.includes(genre)
    ) {
      setSelectedGenres((prev) => [...prev, genre]);
    }
  };

  const onRemoveGenre = (genreToRemove) => {
    setSelectedGenres((prev) => prev.filter((g) => g !== genreToRemove));
  };

  const onCoverFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedCoverFile(e.target.files[0]);
    } else {
      setSelectedCoverFile(null);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Add selected genres as a comma-separated string
    formData.set("genre", selectedGenres.join(", "));

    // Replace coverImage in formData with the file from input if available
    if (selectedCoverFile) {
      formData.set("coverImage", selectedCoverFile);
    }

    // For displaying submitted information in UI,
    // show file name instead of the file object
    const data = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => {
        if (key === "coverImage" && value instanceof File) {
          return [key, value.name];
        }
        return [key, value];
      })
    );

    setSubmitted(data);
  };

  return (
    <div
      className="min-h-[100vh] w-full flex flex-col items-center justify-center bg-white"
      style={orangeTheme}
    >
      <div className="w-full max-w-xl rounded-2xl shadow-2xl p-8 bg-white flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">
          Add a New Book
        </h2>
        <Form
          className="w-full grid grid-cols-2 gap-6 justify-center items-center"
          onSubmit={onSubmit}
          encType="multipart/form-data"
        >
          {/* FIRST COLUMN */}
          <div className="flex flex-col gap-6">
            <Input
              isRequired
              label="Title"
              labelPlacement="outside"
              name="title"
              placeholder="Enter book title"
              color="orange"
            />

            <Input
              label="Author"
              labelPlacement="outside"
              name="author"
              placeholder="Enter author name"
              color="orange"
            />

            {/* Cover Image File Upload */}
            <div>
              <label className="font-semibold text-gray-700 mb-1 block">
                Cover Image <span className="text-orange-500">*</span>
              </label>
              <input
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none bg-gray-50 p-2"
                style={{ colorScheme: "orange" }}
                type="file"
                name="coverImage"
                required
                accept="image/*"
                onChange={onCoverFileChange}
              />
              {selectedCoverFile && (
                <div className="text-xs text-gray-500 mt-1">
                  Selected file: {selectedCoverFile.name}
                </div>
              )}
            </div>

            <div>
              <label className="font-semibold text-gray-700 mb-1 block">
                Genre <span className="text-orange-500">*</span>
              </label>
              <div className="flex">
                {/* Badges area */}
                <div
                  className="flex flex-wrap gap-2 max-h-[48px] overflow-y-auto mr-3 border border-gray-300 rounded px-2 py-1 min-w-[120px] bg-gray-50"
                  style={{ alignItems: "center" }}
                >
                  {selectedGenres.length === 0 && (
                    <span className="text-xs text-gray-400 select-none">
                      No genres selected
                    </span>
                  )}
                  {selectedGenres.map((genre) => (
                    <span
                      key={genre}
                      className="inline-flex items-center gap-1 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full"
                    >
                      {genre}
                      <button
                        type="button"
                        onClick={() => onRemoveGenre(genre)}
                        className="ml-1 p-0.5 hover:bg-gray-600 rounded-full transition-colors"
                        aria-label={`Remove ${genre}`}
                        tabIndex={0}
                      >
                        &#10005;
                      </button>
                    </span>
                  ))}
                </div>
                {/* Dropdown */}
                <select
                  className="border border-gray-300 text-sm rounded focus:outline-none px-2 py-1 min-w-[120px] cursor-pointer"
                  value=""
                  onChange={onAddGenre}
                  disabled={selectedGenres.length >= GENRES.length}
                >
                  <option value="" disabled>
                    Select genre
                  </option>
                  {GENRES.filter((g) => !selectedGenres.includes(g)).map(
                    (genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    )
                  )}
                </select>
              </div>
              {/* Hidden input for form submit */}
              <input
                type="hidden"
                name="genre"
                value={selectedGenres.join(",")}
                readOnly
              />
            </div>

            <Input
              isRequired
              label="Price"
              labelPlacement="outside"
              name="price"
              placeholder="Enter price"
              type="number"
              min={0}
              color="orange"
            />
          </div>

          {/* SECOND COLUMN */}
          <div className="flex flex-col gap-6">
            <Input
              label="Description"
              labelPlacement="outside"
              name="description"
              placeholder="Enter description"
              color="orange"
            />

            {/* Removed: Cover Image URL Input */}

            <Input
              isRequired
              label="Language"
              labelPlacement="outside"
              name="language"
              placeholder="Enter language"
              color="orange"
            />

            <Input
              label="Pages"
              labelPlacement="outside"
              name="pages"
              placeholder="Enter number of pages"
              type="number"
              min={0}
              color="orange"
            />

            <Input
              label="Published Year"
              labelPlacement="outside"
              name="publishedYear"
              placeholder="Enter published year"
              type="number"
              color="orange"
            />
          </div>

          {/* BUTTON and FEEDBACK */}
          <div className="col-span-2 flex gap-4 justify-center mt-3">
            <Button
              type="submit"
              style={{
                backgroundColor: "#ff9800",
                color: "#fff",
                border: "none",
                boxShadow: "0 3px 8px 0 rgba(255, 152, 0, 0.20)"
              }}
              className="px-7 py-2 text-lg font-semibold rounded-lg transition-all hover:bg-orange-600"
            >
              Submit
            </Button>
          </div>

          {submitted && (
            <div className="col-span-2 text-center text-base text-orange-600 mt-5">
              You submitted:{" "}
              <code className="bg-orange-100 px-2 py-1 rounded">
                {JSON.stringify(submitted)}
              </code>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Books;