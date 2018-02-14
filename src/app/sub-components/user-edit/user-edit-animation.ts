import { trigger, state, style, transition,
    animate, group, query, stagger, keyframes
} from '@angular/animations';

export const SlideInOutAnimation = [
    trigger('userState', [
        state('active', style({
            'max-height': '500px', 'opacity': '1', 'visibility': 'visible'
        })),
        state('inactive', style({
            'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
        })),
        transition('active => inactive', 
            [group([
                animate('400ms ease-in-out', style({
                    'opacity': '0'
                })),
                animate('600ms ease-in-out', style({
                    'max-height': '0px'
                })),
                animate('700ms ease-in-out', style({
                    'visibility': 'hidden'
                }))
            ])
        ]),
        transition('inactive => active',
            [group([
                animate('1ms ease-in-out', style({
                    'visibility': 'visible'
                })),
                animate('600ms ease-in-out', style({
                    'max-height': '500px'
                })),
                animate('800ms ease-in-out', style({
                    'opacity': '1'
                }))
            ])
        ])
    ])
]
