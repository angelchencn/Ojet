define(['knockout', 'ojs/ojinputtext'],
    function (ko) {
        var viewModel = function (params) {
            var self = this;
            var userInfoSignal = params.userInfoSignal;
            self.userName = ko.observable();
            self.userCity = ko.observable();
            self.userState = ko.observable();

            userInfoSignal.add(function (user, city, state) {
                self.userName(user);
                self.userCity(city);
                self.userState(state);
            });
        }
        return viewModel;
    }
);