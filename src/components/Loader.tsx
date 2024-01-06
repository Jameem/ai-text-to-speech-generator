export const Loader = ({ isGenerating = false }: { isGenerating: boolean }) => {
  return (
    <div className='loading'>
      <div className={isGenerating ? 'full-bar' : 'bar'}></div>
    </div>
  );
};
