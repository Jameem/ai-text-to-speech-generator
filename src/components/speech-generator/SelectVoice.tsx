interface ISelectVoice {
  onChangeType: React.ChangeEventHandler<HTMLSelectElement>;
}
export type VoiceType =
  | 'alloy'
  | 'echo'
  | 'fable'
  | 'onyx'
  | 'nova'
  | 'shimmer';

export const SelectVoice = ({ onChangeType }: ISelectVoice) => {
  return (
    <>
      <label className='select-label'>Select Voice Type</label>
      <select className='select' onChange={onChangeType}>
        <option value='alloy'>Alloy</option>
        <option value='echo'>Echo</option>
        <option value='fable'>Fable</option>
        <option value='onyx'>Onyx</option>
        <option value='nova'>Nova</option>
        <option value='shimmer'>Shimmer</option>
      </select>
    </>
  );
};
