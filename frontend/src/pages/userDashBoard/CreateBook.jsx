import React, { useState } from "react";
import { Button, Input, Textarea, Select, SelectItem, Alert } from "@heroui/react";
import api from "../../api/axios";

const CreateBook = () => {

  const [submitted, setSubmitted] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [pages, setPages] = useState();
  const [publishedYear, setPublishedYear] = useState();
  const [genre, setGenre] = useState(new Set());
  const [coverImage, setCoverImage] = useState();
  const [language, setLanguage] = useState(new Set());

  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setPrice("");
    setDescription("");
    setPages("");
    setPublishedYear("");
    setGenre(new Set());
    setCoverImage("");
    setLanguage(new Set());
  };


  const onSubmit = async (e) => {

    try {

      e.preventDefault();
      setSuccess(false);
      setIsLoading(true);
      setError(null);

      const genreArr = Array.from(genre);
      const languageValue = [...language][0];

      const payload = { title, author, price, description, pages, genre: genreArr, language: languageValue, coverImage, publishedYear };

      const res = await api.post("/books", payload);
      if (res.data?.success) {
        setSuccess(res.data?.success);
        setSuccessMessage(res.data?.message);
      }

      console.log(success);
      console.log(successMessage);
      resetForm();

    } catch (err) {

      console.error("Error creating book:", err);

      // Handle different error scenarios
      if (err.response) {
        // Server responded with error
        setError(err.response.data?.message || "Failed to create book");
      } else if (err.request) {
        // Request made but no response
        setError("No response from server. Please check your connection.");
      } else {
        // Something else happened
        setError("Something went wrong. Please try again.");
      }

    } finally {
      setIsLoading(false)


    }

  };



  const bookGenres = [
    { key: "fiction", label: "Fiction" },
    { key: "non_fiction", label: "Non-Fiction" },
    { key: "fantasy", label: "Fantasy" },
    { key: "science_fiction", label: "Science Fiction" },
    { key: "mystery", label: "Mystery" },
    { key: "thriller", label: "Thriller" },
    { key: "romance", label: "Romance" },
    { key: "horror", label: "Horror" },
    { key: "biography", label: "Biography" },
    { key: "history", label: "History" },
    { key: "self_help", label: "Self Help" },
    { key: "business", label: "Business" },
    { key: "technology", label: "Technology" },
    { key: "philosophy", label: "Philosophy" },
    { key: "psychology", label: "Psychology" },
    { key: "poetry", label: "Poetry" },
    { key: "comics", label: "Comics & Graphic Novels" }
  ];

  const languages = [
    { key: "english", label: "English" },
    { key: "hindi", label: "Hindi" },
    { key: "tamil", label: "Tamil" },
    { key: "telugu", label: "Telugu" },
    { key: "kannada", label: "Kannada" },
    { key: "malayalam", label: "Malayalam" },
    { key: "marathi", label: "Marathi" },
    { key: "bengali", label: "Bengali" },
    { key: "punjabi", label: "Punjabi" },
    { key: "urdu", label: "Urdu" },
    { key: "gujarati", label: "Gujarati" },
    { key: "odia", label: "Odia" },
    { key: "assamese", label: "Assamese" },
    { key: "sanskrit", label: "Sanskrit" },
    { key: "french", label: "French" },
    { key: "spanish", label: "Spanish" },
    { key: "german", label: "German" },
    { key: "italian", label: "Italian" },
    { key: "portuguese", label: "Portuguese" },
    { key: "japanese", label: "Japanese" },
    { key: "chinese", label: "Chinese" },
    { key: "korean", label: "Korean" },
  ];


  return (
    <>
      <section className=" w-full h-full py-15 flex flex-col gap-10 items-center">
        <header className=" text-center font-bold text-orange-600 text-3xl">Create Book</header>

        <form className="w-full mx-auto max-w-xl flex flex-col justify-center items-center gap-5 border-1 p-5 rounded-xl border-gray-300 shadow-2xl" onSubmit={onSubmit}>

          <div className="w-full flex flex-col md:flex-row items-start justify-center gap-5 ">

            <div className="w-full flex flex-col gap-5">
              <div>
                <Input
                  className="border-1 rounded-xl font-semibold border-gray-500 active:ring-2 active:ring-orange-300"
                  isRequired
                  errorMessage=""
                  label="Title"
                  labelPlacement="outside"
                  name="title"
                  placeholder="Enter book title"
                  type="text"
                  value={title}
                  onChange={(e) => { setTitle(e.target.value) }}
                />
              </div>

              <div>
                <Input
                  className="border-1 rounded-xl font-semibold border-gray-500 active:ring-2 active:ring-orange-300"
                  isRequired
                  errorMessage=""
                  label="Author"
                  labelPlacement="outside"
                  name="author"
                  placeholder="Enter book author name"
                  type="text"
                  value={author}
                  onChange={(e) => { setAuthor(e.target.value) }}
                />
              </div>

              <div>
                <label className="font-semibold text-sm" htmlFor="description">Description</label>
                <Textarea className="max-w-xs border-1 rounded-xl font-semibold border-gray-500 active:ring-2 active:ring-orange-300" name="description" placeholder="Enter book description"
                  value={description}
                  onChange={(e) => { setDescription(e.target.value) }}
                />
              </div>

              <div>
                <Input
                  className="border-1 rounded-xl font-semibold border-gray-500 active:ring-2 active:ring-orange-300"
                  isRequired
                  errorMessage=""
                  label="Cover Image"
                  labelPlacement="outside"
                  name="author"
                  placeholder="Paste the url of coverImage"
                  type="text"
                  value={coverImage}
                  onChange={(e) => { setCoverImage(e.target.value) }}
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-5">

              <div>
                <Select
                  className="max-w-xs border-1 rounded-xl font-semibold border-gray-500 active:ring-2 active:ring-orange-300"
                  label="Genre"
                  labelPlacement="outside"
                  placeholder="Select genre"
                  selectionMode="multiple"
                  selectedKeys={genre}
                  onSelectionChange={setGenre}
                >
                  {bookGenres.map((bookGenres) => (
                    <SelectItem key={bookGenres.key}>{bookGenres.label}</SelectItem>
                  ))}
                </Select>
              </div>

              <div>
                <Input
                  className="border-1 rounded-xl font-semibold border-gray-500 active:ring-2 active:ring-orange-300"
                  isRequired
                  errorMessage=""
                  label="Price"
                  labelPlacement="outside"
                  name="price"
                  placeholder="Enter price of book"
                  type="number"
                  value={price}
                  onChange={(e) => { setPrice(e.target.value) }}
                />
              </div>

              <div>
                <Input
                  className="border-1 rounded-xl font-semibold border-gray-500 active:ring-2 active:ring-orange-300"
                  isRequired
                  errorMessage=""
                  label="Pages"
                  labelPlacement="outside"
                  name="Pages"
                  placeholder="Enter pages of book"
                  type="number"
                  value={pages}
                  onChange={(e) => { setPages(e.target.value) }}
                />
              </div>

              <div>
                <Input
                  className="border-1 rounded-xl font-semibold border-gray-500 active:ring-2 active:ring-orange-300"
                  isRequired
                  errorMessage=""
                  label="publishedYear"
                  labelPlacement="outside"
                  name="publishedYear"
                  placeholder="Enter publish year"
                  type="number"
                  value={publishedYear}
                  onChange={(e) => { setPublishedYear(e.target.value) }}
                />
              </div>

              <div>
                <Select
                  className="max-w-xs border-1 rounded-xl font-semibold border-gray-500 active:ring-2 active:ring-orange-300"
                  items={languages}
                  label="Language"
                  placeholder="Select language"
                  labelPlacement="outside"
                  selectedKeys={language}
                  onSelectionChange={setLanguage}
                >
                  {(languages) => <SelectItem>{languages.label}</SelectItem>}
                </Select>
              </div>
            </div>

          </div>



          <Button className="bg-orange-600 text-white font-semibold" type="submit">
            Submit
          </Button>

          {onSubmit && (
            <div className="text-small text-default-500 mt-2">
              {error && <Alert color="danger" title={error} />}
              {success && <Alert color="success" title={successMessage} />}
            </div>
          )}
        </form>
      </section>
    </>
  );
};

export default CreateBook;
