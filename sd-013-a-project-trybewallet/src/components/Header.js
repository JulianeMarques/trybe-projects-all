import React from 'react';
import PropTypes from 'prop-types';
// Importa o connect para realizar a conexão entre o mapStateToProps e o mapDispatchToProps com o componente Header
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { getEmail } = this.props;
    return (
      <div className="container-header">
        <p data-testid="email-field"> {/* requisito 5 */}
          Email:
          {getEmail} {/* exibe o email do usuário que fez login. */}
        </p>
        <div>
          <p data-testid="total-field">Despesa Total: 0 </p> {/* requisito 5 */} {/* requisito 8 */}
        </div>
        <div>
          <p data-testid="header-currency-field">BRL</p> {/* requisito 5 */}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  getEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  getEmail: state.user.email,
});

export default connect(mapStateToProps)(Header);
