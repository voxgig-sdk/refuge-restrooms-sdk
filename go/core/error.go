package core

type RefugeRestroomsError struct {
	IsRefugeRestroomsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewRefugeRestroomsError(code string, msg string, ctx *Context) *RefugeRestroomsError {
	return &RefugeRestroomsError{
		IsRefugeRestroomsError: true,
		Sdk:              "RefugeRestrooms",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *RefugeRestroomsError) Error() string {
	return e.Msg
}
