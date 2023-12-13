class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 오류 발생 시 업데이트 상태
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 여기서 오류 로깅을 할 수 있습니다.
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 대체 UI 렌더링
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}