const BugForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isUpdateMode = false
}) => {
  
  const handleDateChange = (e) => {
    let value = e.target.value;
    console.log('Date reported changed to:', value);
    onChange({ ...formData, dateReported: value });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label className="label1" htmlFor="input1">Bug Title:</label>
        <input
          className="input1"
          type="text"
          name="title" 
          value={formData.title || ''}  
          onChange={(e) => {
            console.log('Title changed to:', e.target.value); 
            onChange({ ...formData, title: e.target.value });
          }}
          required
        />
      </div>

      <div className="form-group">
        <label className="label1" htmlFor="input1">Description:</label>
        <textarea
          className="input1"
          name="description"
          value={formData.description || ''}  
          onChange={(e) => {
            console.log('Description changed to:', e.target.value); 
            onChange({ ...formData, description: e.target.value });
          }}
          required
        />
      </div>

      <div className="form-group">
        <label className="label1" htmlFor="input1">Priority:</label>
        <input
          className="input1"
          type="text"
          name="priority"
          value={formData.priority || ''}  
          onChange={(e) => {
            console.log('Priority changed to:', e.target.value); 
            onChange({ ...formData, priority: e.target.value });
          }}
          required
        />
      </div>

      <div className="form-group">
        <label className="label1" htmlFor="input1">Status:</label>
        <input
          className="input1"
          type="text"
          name="status"
          value={formData.status || ''} 
          onChange={(e) => {
            console.log('Status changed to:', e.target.value); 
            onChange({ ...formData, status: e.target.value });
          }}
          required
        />
      </div>

      <div className="form-group">
        <label className="label1" htmlFor="input1">Assignee:</label>
        <input
          className="input1"
          type="text"
          name="assignee"
          value={formData.assignee || ''}
          onChange={(e) => {
            console.log('Assignee changed to:', e.target.value);
            onChange({ ...formData, assignee: e.target.value });
          }}
          required
        />
      </div>   

      <div className="form-group">
        <label className="label1" htmlFor="input1">Reporter:</label>
        <input
          className="input1"
          type="text"
          name="reporter"
          value={formData.reporter || ''}  
          onChange={(e) => {
            console.log('Reporter changed to:', e.target.value); 
            onChange({ ...formData, reporter: e.target.value });
          }}
          required
        />
      </div>

      <div className="button-group">
        <button className="add-btn" type="submit">
          {isUpdateMode ? 'Update' : 'Submit'}
        </button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BugForm;
