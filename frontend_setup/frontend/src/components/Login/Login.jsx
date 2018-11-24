import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components
import { Button } from 'components';
// Services and redux action
import { UserAction } from 'actions';
import { ApiService } from 'services';

class Login extends Component {

  constructor(props) {
    // Inherit constructor
    super(props);
    // State for form data and error message
    this.state = {
      form: {
        username: '',
        key: '',
        error: '',
      },
      isSigningIn: false,
    }
    // Bind functions
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Runs on every keystroke to update the React state
  handleChange(event) {
    const { name, value } = event.target;
    const { form } = this.state;

    this.setState({
      form: {
        ...form,
        [name]: value,
        error: '',
      },
    });
  }

  componentDidMount() {
    this.isComponentMounted = true;
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  // Handle form submission to call api
  handleSubmit(event) {
    // Stop the default form submit browser behaviour
    event.preventDefault();
    // Extract `form` state
    const { form } = this.state;
    // Extract `setUser` of `UserAction` and `user.name` of UserReducer from redux
    const { setUser } = this.props;
    // Set loading spinner to the button
    this.setState({ isSigningIn: true });
    // Send a login transaction to the blockchain by calling the ApiService,
    // If it successes, save the username to redux store
    // Otherwise, save the error state for displaying the message
    return ApiService.login(form)
      .then(() => {
        setUser({ name: form.username });
      })
      .catch(err => {
        this.setState({ error: err.toString() });
      })
      .finally(() => {
        if (this.isComponentMounted) {
          this.setState({ isSigningIn: false });
        }
      });
  }

  render() {
    // Extract data from state
    const { form, error, isSigningIn } = this.state;

    return (
      <div className="Login">
        <div class="container">
          <ul class="nav nav-pills nav-justified">
            <li class="active"><a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a></li>

            <li><a class="nav-item nav-link" id="nav-home-tab" data-toggle="tab" href="#nav-reg" role="tab" aria-controls="nav-reg" aria-selected="true">Register</a></li>

            <li class=""><a class="nav-item nav-link active" id="nav-deposit-tab" data-toggle="tab" href="#nav-deposit" role="tab" aria-controls="nav-deposit" aria-selected="true">Deposit</a></li>
            
            <li><a class="nav-item nav-link" id="nav-withdraw-tab" data-toggle="tab" href="#nav-withdraw" role="tab" aria-controls="nav-withdraw" aria-selected="true">Withdraw</a></li>
            
            <li class=""><a class="nav-item nav-link active" id="nav-balance-tab" data-toggle="tab" href="#nav-balance" role="tab" aria-controls="nav-balance" aria-selected="true">Balance</a></li>
            
            <li><a class="nav-item nav-link" id="nav-draw-tab" data-toggle="tab" href="#nav-draw" role="tab" aria-controls="nav-draw" 
            aria-selected="true">Draw</a></li>
            <li><a class="nav-item nav-link" id="nav-transfer-tab" data-toggle="tab" href="#nav-transfer" role="tab" aria-controls="nav-transfer" 
            aria-selected="true">Transfer</a></li>
          </ul>  
        </div>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active in text-center" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <h1 className="title">Welcome Home1</h1>
          </div>
  
          <div class="tab-pane fade show " id="nav-reg" role="tabpanel" aria-labelledby="nav-reg-tab">
            <form name="form" onSubmit={ this.handleSubmit } className='row'>
              <div className="col-lg-4">
              <div className="field">
                <label>Account name</label>
                <input
                  type="text"
                  class="form-control"
                  name="username"
                  value={ form.username }
                  placeholder=""
                  onChange={ this.handleChange }
                  pattern="[\.a-z1-5]{2,12}"
                  required
                />
              </div>
              </div>
              <div className="col-lg-4">
              <div className="field">
                <label>First Name</label>
                <input
                  type="password"
                  class="form-control"
                  name="key"
                  value={ form.key }
                  onChange={ this.handleChange }
                  required
                />
              </div>
              </div>
              <div className="col-lg-4">
              <div className="field">
                <label>Last Name</label>
                <input
                  type="password"
                  class="form-control"
                  name="key"
                  value={ form.key }
                  onChange={ this.handleChange }
                  required
                />
              </div>
              </div>

              <div className="col-lg-12">
              <div className="field form-error">
                { error && <span className="error">{ error }</span> }
              </div>
            <div className="text-center">
              <div className="bottom">
                <Button type="submit" className="btn btn-info" loading={ isSigningIn }>
                  { "Submit" }
                </Button>
              </div>
              </div>
              </div>
            </form>
          </div>

          <div class="tab-pane fade show " id="nav-deposit" role="tabpanel" aria-labelledby="nav-deposit-tab">
            <h1 className="title"><form name="form" onSubmit={ this.handleSubmit } className='row'>
              <div className="col-lg-4">
              <div className="field">
                <label>Amount</label>
                <input
                  type="text"
                  class="form-control"
                  name="username"
                  value={ form.username }
                  placeholder=""
                  onChange={ this.handleChange }
                  pattern="[\.a-z1-5]{2,12}"
                  required
                />
              </div>
              </div>
              <div className="col-lg-12">
              <div className="field form-error">
                { error && <span className="error">{ error }</span> }
              </div>
            <div className="text-center">
              <div className="bottom">
                <Button type="submit" className="btn btn-info" loading={ isSigningIn }>
                  { "Submit" }
                </Button>
              </div>
              </div>
              </div>
            </form></h1>
          </div>


          <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
          <div class="tab-pane fade" id="nav-transfer" role="tabpanel" aria-labelledby="nav-transfer-tab"> transfer</div>
        </div>
      </div>
    )
  }
}

// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Map the following action to props
const mapDispatchToProps = {
  setUser: UserAction.setUser,
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(Login);
