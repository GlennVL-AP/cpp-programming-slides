export module cpprog;

import std;

namespace cpprog {

export enum class ErrorAction
{
    ignore,
    log,
    exception,
    abort
};

export constexpr ErrorAction default_error_action{ErrorAction::exception};

export struct expect_error : public std::runtime_error
{
    using runtime_error::runtime_error;
};

export template <ErrorAction action = default_error_action, typename C>
constexpr void expect(C cond, std::string msg)
{
    if constexpr (action == ErrorAction::log)
    {
        std::cerr << "expect(" << msg << ")\n";
    }
    if constexpr (action == ErrorAction::exception)
    {
        throw expect_error{msg};
    }
    if constexpr (action == ErrorAction::abort)
    {
        std::terminate();
    }
}

export struct narrowing_error : public std::exception
{
    char const* what() const noexcept override
    {
        return "narrowing_error";
    }
}

export template <typename TO, typename FROM>
constexpr TO narrow_cast(FROM&& value)
{
    return static_cast<TO>(std::forward<FROM>(value));
}

export template <typename TO, typename FROM>
constexpr TO narrow(FROM value)
{
    auto const result = narrow_cast<TO>(value);
    if (static_cast<FROM>(result) != value)
    {
        throw narrowing_error{};
    }
    return result;
}

}
