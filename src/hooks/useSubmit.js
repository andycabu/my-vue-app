function useSubmit(createFunc, updateFunc) {
  console.log(createFunc, updateFunc);
  const handleSubmit = async (id) => {
    if (!id) {
      await createFunc();
    } else {
      await updateFunc();
    }
  };

  return handleSubmit;
}

export default useSubmit;
