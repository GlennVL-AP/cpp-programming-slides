export module cpprog;

import std;

namespace cpprog {

export struct expect_error : std::runtime_error
{
    using std::runtime_error::runtime_error;
};

export constexpr void expect(
    std::invocable auto&& cond,
    std::string_view msg,
    std::source_location const location = std::source_location::current()
)
{
    if (!cond()) [[unlikely]]
    {
        throw expect_error{std::format(
            "expect_error @ {}({}:{}) `{}`: {}",
            location.file_name(),
            location.line(),
            location.column(),
            location.function_name(),
            msg
        )};
    }
}

export struct narrowing_error : std::exception
{
    [[nodiscard]] char const* what() const noexcept override { return "narrowing_error"; }
};

export template <typename TO, typename FROM>
[[nodiscard]] constexpr TO narrow_cast(FROM value)
{
    auto const result = static_cast<TO>(value);
    if (static_cast<FROM>(result) != value) { throw narrowing_error{}; }
    return result;
}

} // namespace cpprog
