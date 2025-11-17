
export default function UserView({ user }) {
  return (
    <div className="user-box">

      
      <h2 className="user-box-title">Candidate Id</h2>

      
      <div>
        <span className="user-field-label">Name:</span>
        <span className="user-field-value"> {user.name}</span>
      </div>

      <div>
        <span className="user-field-label">Email:</span>
        <span className="user-field-value"> {user.email}</span>
      </div>

      <div>
        <span className="user-field-label">DevRole:</span>
        <span className="user-field-value"> {user.devRole}</span>
      </div>

    </div>
  );
}


